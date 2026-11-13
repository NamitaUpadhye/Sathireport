import os
import shutil
from fastapi import APIRouter, Depends
from app.config import Settings, get_settings

router = APIRouter(tags=["Health"])


@router.get("/health")
def get_health(settings: Settings = Depends(get_settings)):
    # Check Tesseract binary
    tesseract_exists = False
    if settings.tesseract_cmd and os.path.exists(settings.tesseract_cmd):
        tesseract_exists = True
    elif shutil.which("tesseract"):
        tesseract_exists = True

    gemini_ready = bool(
        settings.gemini_api_key
        and settings.gemini_api_key.strip()
        and settings.gemini_api_key != "your_gemini_api_key_here"
    )
    supabase_ready = bool(settings.supabase_url and settings.supabase_key)

    return {
        "status": "healthy",
        "app_name": settings.app_name,
        "app_version": settings.app_version,
        "services": {
            "gemini": {
                "configured": gemini_ready,
                "model": settings.gemini_model,
            },
            "tesseract_ocr": {
                "available": tesseract_exists,
                "path": settings.tesseract_cmd if tesseract_exists else None,
                "tessdata_dir": settings.tessdata_dir
            },
            "supabase": {
                "configured": supabase_ready,
                "mode": "authenticated" if supabase_ready else "guest_mode",
            }
        }
    }
