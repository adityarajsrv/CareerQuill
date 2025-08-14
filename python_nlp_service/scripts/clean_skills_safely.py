# clean_skills_safely.py
import json
import re
import unicodedata
from collections import Counter, defaultdict

# --- Stopwords (fallback so we don't depend on runtime downloads) -------------
FALLBACK_STOPWORDS = {
    "a","an","and","are","as","at","be","been","but","by","for","from","has","have","he",
    "her","his","i","if","in","into","is","it","its","of","on","or","our","she","so","that",
    "the","their","them","there","these","they","this","those","to","was","we","were","will",
    "with","you","your"
}
try:
    from nltk.corpus import stopwords  # type: ignore
    STOP_WORDS = set(stopwords.words("english"))
except Exception:
    STOP_WORDS = FALLBACK_STOPWORDS

# --- Helper: normalization -----------------------------------------------------
def normalize(s: str) -> str:
    s = unicodedata.normalize("NFKC", s).strip().lower()
    # normalize hyphens/whitespace
    s = re.sub(r"[\u2010-\u2015]+", "-", s)     # all dash types -> '-'
    s = re.sub(r"[•·–—]+", "-", s)             # bullets/dashes -> '-'
    s = re.sub(r"\s+", " ", s)
    return s

# --- Strong blacklist: generic fluff, ambiguous singletons, noisy terms -------
STRONG_BLACKLIST = {
    # resume fluff / adjectives / soft generics
    "fast","quick","hardworking","friendly","dependable","motivated","dedicated","passionate",
    "organized","highly organized","detail oriented","detail-oriented","results oriented",
    "self starter","self-starter","creative","innovative","problem solving","problem solver",
    "leadership","management","managing","excellent communication","communication","team player",
    "multitasker","multitasking","quality","current","works","type","types","tools","platforms",
    "tech","technology","languages","language","user","users","video","image","voice","mail",
    "memory","script","scripting","frame","frames","browser support","education","engineering",
    "engineer","logic","percentage","read","real-time","messaging","platform","platforming",
    "testing knowledge","experience","experienced","background",

    # ambiguous single tokens (kept only in specific combos via canon map)
    "atlas","sage","pl","pr","concur","works","quest",

    # nouns that are too generic on their own
    "data","database","databases","network","networks","backend","frontend",

    # junk/brands/noise we usually don't want as standalone skills
    "leetcode",
}

# --- Short token whitelist (2–3 chars) ----------------------------------------
SHORT_WHITELIST = {
    # languages
    "c","c++","c#","go","js","ts","py","r","php","sql","pl/sql","plsql","vb","asp",
    # data/ai
    "ai","ml","dl","cv","nlp","bi","eda","etl","db","dbms","cnn","rnn","lstm","svm","pca",
    # web / proto / tools
    "api","sdk","cli","gui","git","svn","xml","json","yml","yaml","ini","env",
    "http","tcp","udp","ssh","dns","ip","lan","wan","vpn","tls","ssl",
    # cloud & devops
    "aws","gcp","az","vm","vpc","ec2","s3","iam","eks","gke","aks","ci","cd","tdd",
    # security
    "waf","sso","mfa","jwt","rsa","aes","sha","md5","otp",
    # math
    "ode","pde","fft",
    # misc known legit short skills
    "cad","cam","erp","crm","ux","ui","oop","sql","spa","qa"
}

# --- Canonical mapping (normalize synonyms/variants) --------------------------
CANON_MAP = {
    # languages / frameworks
    "js": "JavaScript",
    "javascript": "JavaScript",
    "ts": "TypeScript",
    "typescript": "TypeScript",
    "py": "Python",
    "python": "Python",
    "go": "Go",
    "java": "Java",
    "scala": "Scala",
    "vb": "VB",
    "php": "PHP",
    "asp": "ASP.NET",
    "asp.net": "ASP.NET",
    "c#": "C#",
    "c++": "C++",
    "r": "R",

    # web/dev
    "node.js": "Node.js",
    "nodejs": "Node.js",
    "express": "Express.js",
    "express.js": "Express.js",
    "react": "React",
    "html": "HTML",
    "rest": "REST APIs",
    "api": "APIs",
    "http": "HTTP",
    "json": "JSON",
    "postman": "Postman",
    "git": "Git",

    # data / db
    "sql": "SQL",
    "mysql": "MySQL",
    "mongodb": "MongoDB",
    "db": "Databases",
    "dbms": "DBMS",
    "database": "Databases",
    "databases": "Databases",
    "data structure": "Data Structures",
    "data structures": "Data Structures",

    # ai/ml/cv
    "bi": "Business Intelligence",
    "cnn": "CNN",
    "opencv": "OpenCV",
    "pillow": "Pillow",
    "object-oriented programming": "OOP",

    # networking
    "network": "Networking",
    "networking": "Networking",
    "ip": "IP",
    "lan": "LAN",

    # fintech domain
    "lending": "Lending",
}

# --- Phrase cleanup rules ------------------------------------------------------
# Drop phrases that are only punctuation/number, or only stopwords, etc.
ONLY_PUNCT_RE = re.compile(r"^[^\w]+$")
ONLY_NUM_RE = re.compile(r"^\d+(\.\d+)?%?$")

def should_keep_short_token(tok: str) -> bool:
    return tok in SHORT_WHITELIST and tok not in STRONG_BLACKLIST

def canonicalize(raw: str) -> str | None:
    s = normalize(raw)
    if not s or ONLY_PUNCT_RE.match(s) or ONLY_NUM_RE.match(s):
        return None

    # immediate blacklist
    if s in STRONG_BLACKLIST:
        return None

    # stopwords alone are not skills
    if s in STOP_WORDS:
        return None

    # special handling for 2–3 char tokens
    if len(s) <= 3 and not should_keep_short_token(s):
        return None

    # standardize common dots/dashes variants
    s = s.replace("nodejs", "node.js")
    s = s.replace("expressjs", "express.js")

    # reduce trivial plurals (naive but useful for many tech nouns)
    if s.endswith("s") and s[:-1] in CANON_MAP:
        s = s[:-1]

    # canonical map first pass
    if s in CANON_MAP:
        s = CANON_MAP[s]
    else:
        # try canonicalizing joined words like "data structure"
        s = CANON_MAP.get(s, s)

    # Second pass: post-map blacklist (in case canonical target is generic)
    s_norm = normalize(s)
    if s_norm in STRONG_BLACKLIST or s_norm in STOP_WORDS:
        return None

    # Capitalize acronyms nicely
    if s.upper() in {"API","APIS"}:
        return "APIs"
    if s.upper() == "HTTP":
        return "HTTP"
    if s.upper() == "SQL":
        return "SQL"
    if s.upper() == "DBMS":
        return "DBMS"
    if s.upper() == "LAN":
        return "LAN"
    if s.upper() == "IP":
        return "IP"
    if s.upper() == "CNN":
        return "CNN"
    if s.upper() == "OOP":
        return "OOP"

    # Title-case general multi-word skills (except known camelcase libs)
    if s not in {"Node.js","Express.js","OpenCV","Postman","MongoDB","MySQL","TypeScript",
                 "JavaScript","ASP.NET","JSON","React","Pillow"}:
        if " " in s and not any(ch.isupper() for ch in s):
            s = " ".join(w.capitalize() if len(w) > 2 else w.upper() for w in s.split())

    return s

def clean_and_aggregate(skills_map: dict[str, int]) -> dict[str, int]:
    agg = Counter()
    for raw, count in skills_map.items():
        canon = canonicalize(raw)
        if not canon:
            continue
        agg[canon] += int(count) if isinstance(count, int) else 1
    return dict(sorted(agg.items(), key=lambda x: (-x[1], x[0].lower())))

if __name__ == "__main__":
    # Load the intermediate skills map (adjust the path if yours differs)
    INPUT = "python_nlp_service/config/skills_map_cleaned.json"
    OUTPUT = "python_nlp_service/config/skills_map_final.json"

    with open(INPUT, "r", encoding="utf-8") as f:
        skills_map = json.load(f)

    cleaned = clean_and_aggregate(skills_map)

    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(cleaned, f, indent=2, ensure_ascii=False)

    print(f"✅ Cleaned skills map saved to {OUTPUT}. Total canonical skills: {len(cleaned)}")
