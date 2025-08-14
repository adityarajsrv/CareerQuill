from python_nlp_service.modules.utils import read_file
from python_nlp_service.modules.extractor import extract_all
from pathlib import Path

resume_path = Path(__file__).resolve().parent.parent / "ResumeTests" / "Resume.pdf"
text = read_file(resume_path)
data = extract_all(text)

print("Resume Data Extracted: ")
print(data)
