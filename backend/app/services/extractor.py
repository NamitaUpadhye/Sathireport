import io
import os
import re
from typing import Tuple, Optional
from PIL import Image, ImageEnhance, ImageFilter
import pytesseract
from pypdf import PdfReader
import pdfplumber

from app.config import get_settings

settings = get_settings()

# Configure Tesseract command and tessdata prefix
if settings.tesseract_cmd and os.path.exists(settings.tesseract_cmd):
    pytesseract.pytesseract.tesseract_cmd = settings.tesseract_cmd

if settings.tessdata_dir and os.path.exists(settings.tessdata_dir):
    os.environ["TESSDATA_PREFIX"] = settings.tessdata_dir


def preprocess_image_for_ocr(image: Image.Image) -> Image.Image:
    """
    Apply image preprocessing techniques to improve OCR accuracy on medical lab reports:
    1. Convert to grayscale
    2. Rescale/Enhance contrast
    3. Light sharpening
    """
    # Convert to grayscale
    gray = image.convert('L')

    # Enhance contrast
    enhancer = ImageEnhance.Contrast(gray)
    enhanced = enhancer.enhance(1.8)

    # Optional mild sharpening for smudged dot-matrix or thermal paper lab printouts
    sharpened = enhanced.filter(ImageFilter.SHARPEN)

    return sharpened


def extract_text_from_image(image_bytes: bytes) -> Tuple[str, str]:
    """
    Extracts text from an image (PNG, JPG, TIFF, etc.) using Tesseract OCR.
    Returns: (extracted_text, method_used)
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
        processed_image = preprocess_image_for_ocr(image)

        # Standard OCR configuration for documents with columnar data
        custom_config = r'--oem 3 --psm 6'
        text = pytesseract.image_to_string(processed_image, config=custom_config)

        # If sparse, try automatic page segmentation (psm 3)
        if len(text.strip()) < 50:
            text = pytesseract.image_to_string(processed_image, config=r'--oem 3 --psm 3')

        return text.strip(), "tesseract_ocr"
    except Exception as e:
        raise RuntimeError(f"OCR Extraction failed: {str(e)}")


def extract_text_from_pdf(pdf_bytes: bytes) -> Tuple[str, str]:
    """
    Extracts text from a PDF file using pdfplumber with fallback to pypdf.
    Returns: (extracted_text, method_used)
    """
    extracted_pages = []

    # Try pdfplumber first (best for tables and layout preservation)
    try:
        with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
            for page_idx, page in enumerate(pdf.pages):
                page_text = page.extract_text(layout=True)
                if page_text:
                    extracted_pages.append(f"--- Page {page_idx + 1} ---\n{page_text}")
    except Exception as e:
        extracted_pages = []

    full_text = "\n\n".join(extracted_pages).strip()

    # Fallback to PyPDF if pdfplumber extracted very little
    if len(full_text) < 50:
        try:
            reader = PdfReader(io.BytesIO(pdf_bytes))
            pypdf_pages = []
            for page_idx, page in enumerate(reader.pages):
                text = page.extract_text()
                if text:
                    pypdf_pages.append(f"--- Page {page_idx + 1} ---\n{text}")
            fallback_text = "\n\n".join(pypdf_pages).strip()
            if len(fallback_text) > len(full_text):
                full_text = fallback_text
        except Exception:
            pass

    if len(full_text) > 0:
        return full_text, "pdf_text_extraction"

    return "", "empty_or_scanned_pdf"


def extract_content(file_bytes: bytes, filename: str) -> Tuple[str, str]:
    """
    Universal extractor: handles PDF, PNG, JPG, JPEG, WEBP.
    Returns: (extracted_text, extraction_method)
    """
    ext = os.path.splitext(filename)[1].lower()

    if ext == ".pdf":
        text, method = extract_text_from_pdf(file_bytes)
        if method == "empty_or_scanned_pdf" or len(text.strip()) < 30:
            return text, "scanned_pdf_needs_ocr"
        return text, method

    elif ext in [".png", ".jpg", ".jpeg", ".bmp", ".tiff", ".webp"]:
        return extract_text_from_image(file_bytes)

    else:
        raise ValueError(f"Unsupported file format: {ext}. Please provide a PDF or image file (PNG/JPG).")
