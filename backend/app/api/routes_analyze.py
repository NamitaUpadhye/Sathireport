import os
import logging
from typing import Optional, Literal
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from pydantic import BaseModel

from app.schemas.extraction import ExtractionResult
from app.services.extractor import extract_content
from app.services.gemini_ai import analyze_medical_report_with_gemini, get_demo_analysis
from app.services.sample_reports import SAMPLE_CBC_REPORT, SAMPLE_LIPID_REPORT, SAMPLE_METABOLIC_REPORT
from app.config import Settings, get_settings

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/reports", tags=["Report Analysis"])


class AnalyzeTextRequest(BaseModel):
    text: str
    report_type: Optional[str] = "Laboratory Report"


class SampleReportRequest(BaseModel):
    sample_type: Literal["cbc", "lipid", "metabolic"]


@router.post("/analyze", response_model=ReportAnalysis)
def analyze_uploaded_file(
    file: UploadFile = File(...),
    settings: Settings = Depends(get_settings)
):
    """
    Upload a medical laboratory report (PDF or Image: PNG, JPG, WEBP).
    Extracts text using PDF parser / Tesseract OCR and generates an educational explanation with Gemini.
    """
    allowed_exts = {".pdf", ".png", ".jpg", ".jpeg", ".bmp", ".tiff", ".webp"}
    filename = file.filename or "unknown_report.pdf"
    ext = os.path.splitext(filename)[1].lower()

    if ext not in allowed_exts:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format '{ext}'. Please upload a PDF or image file (PNG, JPG, WEBP)."
        )

    try:
        file_bytes = file.file.read()
        if len(file_bytes) == 0:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")

        # Extract text via Tesseract OCR or PDF extractor
        extracted_text, method = extract_content(file_bytes, filename)

        if not extracted_text or len(extracted_text.strip()) < 15:
            return get_demo_analysis(
                f"[Document: {filename} - Text could not be clearly resolved from this scan. Displaying CBC baseline.]"
            )

        # Analyze using Gemini AI
        analysis = analyze_medical_report_with_gemini(
            raw_text=extracted_text,
            extraction_source=f"{filename} via {method}"
        )
        return analysis

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Error processing uploaded report")
        raise HTTPException(
            status_code=500,
            detail=f"Internal error processing laboratory report: {str(e)}"
        )


@router.post("/text", response_model=ReportAnalysis)
def analyze_raw_text(
    payload: AnalyzeTextRequest,
    settings: Settings = Depends(get_settings)
):
    """Analyze manually pasted or pre-extracted laboratory report text."""
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="Report text cannot be blank.")

    analysis = analyze_medical_report_with_gemini(
        raw_text=payload.text,
        extraction_source="Direct text input"
    )
    return analysis


@router.post("/sample", response_model=ReportAnalysis)
def analyze_sample(payload: SampleReportRequest):
    """Pre-loaded sample reports for immediate evaluation and testing without file upload."""
    sample_texts = {
        "cbc": SAMPLE_CBC_REPORT,
        "lipid": SAMPLE_LIPID_REPORT,
        "metabolic": SAMPLE_METABOLIC_REPORT
    }

    text = sample_texts.get(payload.sample_type, SAMPLE_CBC_REPORT)
    analysis = analyze_medical_report_with_gemini(
        raw_text=text,
        extraction_source=f"Sample: {payload.sample_type.upper()} Panel"
    )
    return analysis
