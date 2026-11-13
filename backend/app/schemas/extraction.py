from pydantic import BaseModel, Field

class ExtractionResult(BaseModel):
    filename: str = Field(..., description="Uploaded file name")
    extracted_text: str = Field(..., description="Raw extracted text from the document")
    method: str = Field(..., description="Extraction method used: 'pdf_text_extraction', 'tesseract_ocr', 'scanned_pdf_needs_ocr', etc.")
    status: str = Field(..., description="Processing status, e.g., 'success' or error reason")
