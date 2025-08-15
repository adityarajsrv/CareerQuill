# Helpers (file reading, cleaning, loading config)

import os
import re
import json
import docx
import fitz 
from pathlib import Path

CONFIG_PATH = Path(__file__).resolve().parent.parent / "config" / "skills_map_master.json"

def read_file(file_path):
    """Read and return text from PDF, DOCX, or TXT."""
    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".pdf":
        return read_pdf(file_path)
    elif ext == ".docx":
        return read_docx(file_path)
    elif ext == ".txt":
        return read_txt(file_path)
    else:
        raise ValueError(f"Unsupported file type: {ext}")

def read_pdf(file_path):
    text = ""
    with fitz.open(file_path) as pdf:
        for page in pdf:
            text += page.get_text("text") + "\n"
    return text

def read_docx(file_path):
    doc = docx.Document(file_path)
    return "\n".join([p.text for p in doc.paragraphs])

def read_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()

def clean_text(text):
    """Normalize whitespace and remove weird characters."""
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def load_skills_map():
    """Load skills mapping JSON."""
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)
