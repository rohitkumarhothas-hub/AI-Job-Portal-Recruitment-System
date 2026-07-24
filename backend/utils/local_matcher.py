def local_skill_match(resume_skills, job_skills):

    resume_set = set(
        skill.lower().strip()
        for skill in resume_skills
    )

    job_set = set(
        skill.lower().strip()
        for skill in job_skills
    )

    matched = list(
        resume_set.intersection(job_set)
    )

    missing = list(
        job_set - resume_set
    )

    if len(job_set) == 0:
        score = 0
    else:
        score = round(
            (len(matched) / len(job_set)) * 100
        )

    return {
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }