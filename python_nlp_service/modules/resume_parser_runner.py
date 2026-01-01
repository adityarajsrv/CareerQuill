# python_nlp_service/modules/resume_parser_runner.py
import sys
import json
import traceback
from pathlib import Path

# Add the project root to Python path
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

try:
    from python_nlp_service.modules.resume_parser import parse_resume
except ImportError as e:
    error_info = {
        "error": f"Import failed: {str(e)}",
        "missing_dependency": True,
        "solution": "Run: pip install python-docx PyMuPDF spacy",
        "python_path": sys.path
    }
    print(json.dumps(error_info))
    sys.exit(1)

if len(sys.argv) < 2:
    print(json.dumps({"error": "No file provided"}))
    sys.exit(1)

file_path = sys.argv[1]

try:
    result = parse_resume(file_path)
    print(json.dumps(result))
except Exception as e:
    error_data = {
        "error": f"Parsing failed: {str(e)}",
        "traceback": traceback.format_exc()
    }
    print(json.dumps(error_data))
    sys.exit(1)