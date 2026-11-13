import logging
from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.schemas.report import ReportAnalysis
from app.services.supabase_client import get_supabase_client

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/history", tags=["Report History"])

# In-memory store for guest mode session
GUEST_HISTORY: List[dict] = []


class SaveReportRequest(BaseModel):
    user_id: Optional[str] = "guest"
    title: str
    overall_status: str
    report_data: ReportAnalysis


@router.get("/")
def list_reports(user_id: Optional[str] = "guest"):
    """Fetch saved reports for a user or guest session."""
    client = get_supabase_client()
    if client and user_id and user_id != "guest":
        try:
            res = client.table("saved_reports").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
            return {"mode": "supabase", "reports": res.data or []}
        except Exception as e:
            logger.warning(f"Failed to query Supabase: {e}. Falling back to local history.")

    # Guest session fallback
    return {"mode": "guest", "reports": GUEST_HISTORY}


@router.post("/")
def save_report(payload: SaveReportRequest):
    """Save an analyzed report to history."""
    item = {
        "id": f"rep_{len(GUEST_HISTORY) + 1}_{int(datetime.now().timestamp())}",
        "user_id": payload.user_id,
        "title": payload.title,
        "overall_status": payload.overall_status,
        "report_data": payload.report_data.model_dump(),
        "created_at": datetime.now().isoformat()
    }

    client = get_supabase_client()
    if client and payload.user_id and payload.user_id != "guest":
        try:
            client.table("saved_reports").insert(item).execute()
            return {"status": "saved", "mode": "supabase", "report": item}
        except Exception as e:
            logger.error(f"Error inserting report into Supabase: {e}")

    # Guest store
    GUEST_HISTORY.insert(0, item)
    if len(GUEST_HISTORY) > 20:
        GUEST_HISTORY.pop()

    return {"status": "saved", "mode": "guest", "report": item}


@router.delete("/{report_id}")
def delete_report(report_id: str, user_id: Optional[str] = "guest"):
    """Delete a report from history."""
    global GUEST_HISTORY
    client = get_supabase_client()
    if client and user_id and user_id != "guest":
        try:
            client.table("saved_reports").delete().eq("id", report_id).eq("user_id", user_id).execute()
            return {"status": "deleted", "id": report_id}
        except Exception as e:
            logger.error(f"Error deleting from Supabase: {e}")

    GUEST_HISTORY = [r for r in GUEST_HISTORY if r.get("id") != report_id]
    return {"status": "deleted", "id": report_id}
