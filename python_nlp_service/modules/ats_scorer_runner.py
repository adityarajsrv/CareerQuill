# python_nlp_service/modules/ats_scorer_runner.py
import sys
import os
import json
import traceback
from pathlib import Path

# Add the project root to Python path
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

print(f"Python path: {sys.path}")
print(f"Current working directory: {os.getcwd()}")

try:
    from python_nlp_service.modules.ats_scorer import ats_score_verbose
    print("✅ Successfully imported ats_score_verbose")
except ImportError as e:
    error_info = {
        "error": f"Import failed: {str(e)}",
        "missing_dependency": True,
        "solution": "Run: pip install python-docx PyMuPDF spacy",
        "python_path": sys.path,
        "traceback": traceback.format_exc()
    }
    print(json.dumps(error_info))
    sys.exit(1)

if len(sys.argv) < 2:
    print(json.dumps({"error": "No file provided"}))
    sys.exit(1)

file_path = sys.argv[1]
job_title = sys.argv[2] if len(sys.argv) > 2 else ""
experience_level = sys.argv[3] if len(sys.argv) > 3 else ""

print(f"Processing file: {file_path}")
print(f"Job title: {job_title}, Experience level: {experience_level}")

try:
    if not os.path.exists(file_path):
        print(json.dumps({"error": f"File not found: {file_path}"}))
        sys.exit(1)
    
    # Call with job parameters from frontend
    result = ats_score_verbose(file_path, job_title, experience_level)
    
    print(json.dumps(result))
    
except Exception as e:
    error_data = {
        "error": f"Failed to score resume: {str(e)}",
        "traceback": traceback.format_exc()
    }
    print(json.dumps(error_data))
    sys.exit(1)