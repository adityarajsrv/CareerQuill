# python_nlp_service/modules/jd_processor.py
import re
from python_nlp_service.modules.skills_standardizer import standardize_skills

def process_jd(jd_json):
    """
    Process a single JD JSON object and return structured info
    """
    skills = standardize_skills(jd_json.get("Skills", []))
    education = jd_json.get("Education", [])  # optional, can be empty
    years_exp = jd_json.get("YearsOfExperience", "0-0")
    # Convert to min/max years
    if "-" in years_exp:
        min_exp, max_exp = map(int, years_exp.split("-"))
    else:
        min_exp = max_exp = int(re.findall(r"\d+", years_exp)[0])
    certifications = jd_json.get("Certifications", [])
    keywords = jd_json.get("Keywords", [])
    return {
        "skills": skills,
        "education": education,
        "min_exp": min_exp,
        "max_exp": max_exp,
        "certifications": certifications,
        "keywords": keywords
    }
