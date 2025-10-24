from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import subprocess
import json
import os
import tempfile
import sys
from pathlib import Path
from pydantic import BaseModel

# Add the project root to Python path
project_root = Path(__file__).parent.parent
sys.path.append(str(project_root))

app = FastAPI(title="ResumeForge API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScoreRequest(BaseModel):
    job_title: str
    experience_level: str

@app.get("/")
async def root():
    return {"message": "ResumeForge API is running"}

@app.post("/api/ats/parse")
async def parse_resume(file: UploadFile = File(...)):
    """
    Step 1: Just parse the resume without scoring
    """
    if not file.filename.lower().endswith(('.pdf', '.docx')):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are allowed")
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=Path(file.filename).suffix) as temp_file:
        content = await file.read()
        temp_file.write(content)
        temp_path = temp_file.name
    
    try:
        print(f"Parsing file: {file.filename}")
        
        # Direct import approach - more reliable
        try:
            from python_nlp_service.modules.resume_parser import parse_resume as parse_resume_function
            print("✅ Successfully imported parser")
        except ImportError as e:
            print(f"❌ Import failed: {e}")
            raise HTTPException(status_code=500, detail=f"Parser import failed: {e}")
        
        parsed_data = parse_resume_function(temp_path)
        return JSONResponse(content=parsed_data)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_path):
            os.unlink(temp_path)
            
@app.post("/api/ats/score")
async def score_resume(file: UploadFile = File(...), job_title: str = "", experience_level: str = ""):
    """
    Step 3: Score resume against specific job description
    """
    if not file.filename.lower().endswith(('.pdf', '.docx')):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are allowed")
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=Path(file.filename).suffix) as temp_file:
        content = await file.read()
        temp_file.write(content)
        temp_path = temp_file.name
    
    try:
        print(f"Scoring file against: {job_title} ({experience_level})")
        
        project_root = Path(__file__).parent.parent
        
        # Run scorer with job parameters
        result = subprocess.run([
            'python', 
            'python_nlp_service/modules/ats_scorer_runner.py', 
            temp_path,
            job_title,
            experience_level
        ], capture_output=True, text=True, cwd=project_root)
        
        print(f"Scorer return code: {result.returncode}")
        print(f"Scorer stdout: {result.stdout}")
        
        if result.returncode != 0:
            raise HTTPException(status_code=500, detail=f"Failed to score resume: {result.stderr}")
        
        score_result = json.loads(result.stdout)
        return JSONResponse(content=score_result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_path):
            os.unlink(temp_path)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "ResumeForge API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)