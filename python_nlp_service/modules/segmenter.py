# Break resume into sections

import re

def segment_sections(text):
    """Split resume into sections based on common headings."""
    section_patterns = [
        r"skills", r"technical skills", r"experience", r"work experience",
        r"education", r"projects", r"certifications"
    ]

    sections = {}
    lower_text = text.lower()

    for pattern in section_patterns:
        match = re.search(pattern, lower_text)
        if match:
            start = match.start()
            sections[pattern] = text[start:]
    return sections
