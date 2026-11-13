from typing import List, Optional, Literal
from pydantic import BaseModel, Field


class LabItem(BaseModel):
    name: str = Field(description="Name of the test or biomarker, e.g. Hemoglobin")
    value: str = Field(description="Observed value in the report, e.g. 13.5")
    unit: str = Field(default="", description="Unit of measurement, e.g. g/dL")
    reference_range: str = Field(default="", description="Expected normal range, e.g. 12.0 - 15.5")
    status: Literal["normal", "high", "low", "borderline", "inconclusive"] = Field(
        default="normal",
        description="Categorization of the value relative to the reference range"
    )
    explanation: str = Field(
        default="",
        description="Patient-friendly, 1-2 sentence plain-language explanation of what this test measures and what this value signifies."
    )


class LabCategory(BaseModel):
    category_name: str = Field(description="E.g., Complete Blood Count (CBC), Lipid Profile, Metabolic Panel")
    tests: List[LabItem] = Field(default_factory=list)


class ReportAnalysis(BaseModel):
    title: str = Field(default="Laboratory Test Report Analysis", description="Title or type of medical report")
    summary: str = Field(description="Clear, compassionate 2-3 paragraph plain-English overview of the findings")
    overall_status: Literal["normal", "attention_needed", "consult_doctor_promptly"] = Field(
        default="normal",
        description="Overall diagnostic signal indicator"
    )
    categories: List[LabCategory] = Field(default_factory=list, description="Categorized lab test results")
    key_findings: List[str] = Field(default_factory=list, description="Top 3-5 key points the user needs to know")
    questions_for_doctor: List[str] = Field(
        default_factory=list,
        description="3-5 recommended questions tailored to these specific results to ask their doctor"
    )
    educational_disclaimer: str = Field(
        default=(
            "ReportSaathi is an educational and literacy tool, NOT a diagnostic service. "
            "Never make medical decisions, start, alter, or stop any medications based solely on this summary. "
            "Always consult your licensed physician or healthcare provider with your official report."
        )
    )
    extraction_source: Optional[str] = None
