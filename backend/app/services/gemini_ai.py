import json
import logging
from typing import Optional, Dict, Any
import httpx
from app.config import get_settings
from app.schemas.report import ReportAnalysis, LabCategory, LabItem

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are ReportSaathi, an empathetic and highly knowledgeable senior medical educator.
Your mission is to translate complex, technical laboratory test reports into clear, empowering, and easily understandable language for patients and their families.

Strict Guidelines:
1. EDUCATIONAL ONLY: You do NOT diagnose illnesses, prescribe medication, or give definitive medical prognoses.
2. ACCURACY: Compare each test result strictly against the reference range reported on the sheet. Mark status as 'normal', 'high', 'low', or 'borderline'.
3. ACCESSIBLE LANGUAGE: Explain biological terms using everyday analogies (e.g., "Hemoglobin is the oxygen delivery vehicle in your blood"). Avoid scary medical jargon.
4. ACTIONABLE & SUPPORTIVE: Provide 3-5 specific, thoughtful questions the patient can ask their doctor.
5. STRUCTURED OUTPUT: Return ONLY valid JSON matching the exact required schema. Do not wrap in markdown code blocks like ```json.
"""


def get_demo_analysis(report_text: str) -> ReportAnalysis:
    """Fallback demonstration analysis when no Gemini API key is configured."""
    return ReportAnalysis(
        title="Comprehensive Health Laboratory Analysis",
        summary=(
            "This report provides an assessment of your key blood biomarkers. "
            "Overall, your blood counts show a slight dip in hemoglobin and red blood cell count, indicating mild anemia. "
            "Your white blood cells and platelets are healthy, showing good immune defense and normal clotting ability. "
            "Please review these results with your healthcare provider to investigate possible dietary or lifestyle factors."
        ),
        overall_status="attention_needed",
        categories=[
            LabCategory(
                category_name="Red Blood Cells & Oxygen Transport",
                tests=[
                    LabItem(
                        name="Hemoglobin (Hb)",
                        value="11.2",
                        unit="g/dL",
                        reference_range="13.5 - 17.5",
                        status="low",
                        explanation="Hemoglobin is the protein in red blood cells that transports oxygen throughout your body. Your level is slightly below the standard range, which can cause mild fatigue or low energy."
                    ),
                    LabItem(
                        name="RBC Count",
                        value="3.8",
                        unit="mil/cumm",
                        reference_range="4.5 - 5.9",
                        status="low",
                        explanation="The total count of red blood cells. A slightly low count is commonly related to mild iron deficiency or dietary factors."
                    ),
                    LabItem(
                        name="Packed Cell Volume (PCV / Hematocrit)",
                        value="34.2",
                        unit="%",
                        reference_range="40.0 - 50.0",
                        status="low",
                        explanation="The proportion of your blood that is made up of red blood cells. Slightly low, consistent with the hemoglobin level."
                    )
                ]
            ),
            LabCategory(
                category_name="Immune System & Clotting",
                tests=[
                    LabItem(
                        name="Total Leukocyte Count (WBC)",
                        value="9,400",
                        unit="/cumm",
                        reference_range="4,000 - 11,000",
                        status="normal",
                        explanation="White blood cells protect your body against infections. Your count is in the ideal healthy range."
                    ),
                    LabItem(
                        name="Platelet Count",
                        value="245,000",
                        unit="/cumm",
                        reference_range="150,000 - 450,000",
                        status="normal",
                        explanation="Platelets help your blood clot when you have an injury. Your count indicates good natural clotting capability."
                    )
                ]
            )
        ],
        key_findings=[
            "Mildly decreased hemoglobin (11.2 g/dL) suggests mild anemia.",
            "White blood cell count is within normal parameters, showing no signs of acute infection.",
            "Platelets and clotting factors are healthy.",
            "A physician may suggest an iron panel (serum ferritin) or vitamin B12 check."
        ],
        questions_for_doctor=[
            "Could my slightly low hemoglobin explain any recent tiredness or feeling sluggish?",
            "Do you recommend checking serum ferritin (iron stores) or vitamin B12?",
            "Are there dietary adjustments or supplements suitable for my profile?",
            "When should I repeat this blood count to recheck my levels?"
        ],
        extraction_source="Demo Mode"
    )


def analyze_medical_report_with_gemini(raw_text: str, extraction_source: str = "extracted_text") -> ReportAnalysis:
    """
    Sends raw report text to Google Gemini model and parses the structured response.
    Uses synchronous httpx client for maximum stability on Windows.
    """
    settings = get_settings()

    # If no key or placeholder, return high quality demo analysis
    if not settings.gemini_api_key or settings.gemini_api_key.strip() == "" or settings.gemini_api_key == "your_gemini_api_key_here":
        logger.warning("No Gemini API key configured. Returning demo analysis.")
        analysis = get_demo_analysis(raw_text)
        analysis.extraction_source = f"{extraction_source} (Demo Mode - Add GEMINI_API_KEY in .env)"
        return analysis

    user_prompt = f"""Please analyze the following laboratory test report and explain it for the patient:

=== RAW REPORT TEXT ===
{raw_text}
=======================

Extract every test with its value, unit, reference range, status (normal, high, low, borderline), and a plain-language explanation.
Group them into logical biological categories. Provide clear key findings and questions for their doctor."""

    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/{settings.gemini_model}:generateContent?key={settings.gemini_api_key}"

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": f"{SYSTEM_PROMPT}\n\n{user_prompt}"}
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.2
        }
    }

    try:
        with httpx.Client(timeout=45.0) as client:
            response = client.post(api_url, json=payload)
            if response.status_code != 200:
                logger.error(f"Gemini API error ({response.status_code}): {response.text}")
                demo = get_demo_analysis(raw_text)
                demo.summary = f"Notice: Gemini API returned HTTP {response.status_code}. Showing baseline analysis.\n\n" + demo.summary
                return demo

            result_json = response.json()
            candidates = result_json.get("candidates", [])
            if not candidates:
                raise ValueError("No response generated by Gemini.")

            content_text = candidates[0].get("content", {}).get("parts", [{}])[0].get("text", "")
            parsed_data = json.loads(content_text)

            analysis = ReportAnalysis(**parsed_data)
            analysis.extraction_source = extraction_source
            return analysis

    except Exception as e:
        logger.exception("Failed to query Gemini API or parse response")
        demo = get_demo_analysis(raw_text)
        demo.summary = f"Notice: Could not reach live Gemini model ({str(e)}). Displaying baseline summary.\n\n" + demo.summary
        return demo
