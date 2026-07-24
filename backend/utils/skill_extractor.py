def analyze_resume(text):

    skills = [
        "python",
        "java",
        "javascript",
        "react",
        "fastapi",
        "sql",
        "mongodb",
        "machine learning",
        "data science",
        "aws",
        "docker"
    ]


    text_lower = text.lower()


    detected_skills = []

    for skill in skills:
        if skill in text_lower:
            detected_skills.append(skill)


    score = len(detected_skills) * 10

    if score > 100:
        score = 100


    missing_skills = [
        skill for skill in skills
        if skill not in detected_skills
    ]


    return {
        "score": score,
        "detected_skills": detected_skills,
        "missing_skills": missing_skills
    }