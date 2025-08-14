def score_resume_against_job(resume_data, job_data):
    """
    Placeholder: Compare resume_data & job_data for ATS scoring.
    """
    resume_skills = set(resume_data.get("skills", []))
    job_skills = set(job_data.get("skills", []))

    skill_match = len(resume_skills & job_skills) / max(1, len(job_skills))
    score = skill_match * 100  # % match

    return {
        "score": round(score, 2),
        "matching_skills": list(resume_skills & job_skills),
        "missing_skills": list(job_skills - resume_skills)
    }
