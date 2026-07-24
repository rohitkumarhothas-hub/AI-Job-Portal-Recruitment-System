from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import json

from database import get_db
from models import Resume, Job
from utils.job_matcher import analyze_job_match
from utils.local_matcher import local_skill_match


router = APIRouter(
    prefix="/analysis",
    tags=["Resume Analysis Dashboard"]
)


# -----------------------------
# Get All Resumes
# -----------------------------
@router.get("/resumes")
def get_all_resumes(
    db: Session = Depends(get_db)
):

    resumes = db.query(Resume).all()

    print("========== DEBUG ==========")
    print("Total resumes:", len(resumes))
    print(resumes)
    print("===========================")

    result = []

    for resume in resumes:

        result.append(
            {
                "id": resume.id,
                "filename": resume.filename,
                "score": resume.score,
                "skills": json.loads(resume.skills)
                if resume.skills else [],
                "missing_skills": json.loads(resume.missing_skills)
                if resume.missing_skills else []
            }
        )

    return result


# -----------------------------
# Get Resume Report
# -----------------------------
@router.get("/resume/{resume_id}")
def get_resume_report(
    resume_id: int,
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.id == resume_id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return {
        "id": resume.id,
        "filename": resume.filename,
        "score": resume.score,
        "resume_text": resume.extracted_text,
        "detected_skills": json.loads(resume.skills)
        if resume.skills else [],
        "missing_skills": json.loads(resume.missing_skills)
        if resume.missing_skills else []
    }


# -----------------------------
# Resume vs Job Matching
# -----------------------------
@router.post("/job-match/{resume_id}/{job_id}")
def match_resume_with_job(
    resume_id: int,
    job_id: int,
    db: Session = Depends(get_db)
):

    resume = db.query(Resume).filter(
        Resume.id == resume_id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    job = db.query(Job).filter(
        Job.id == job_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    resume_skills = json.loads(resume.skills) if resume.skills else []

    job_skills = json.loads(job.required_skills) if job.required_skills else []

    local_result = local_skill_match(
        resume_skills,
        job_skills
    )

    ai_feedback = "AI feedback unavailable."

    try:
        ai_feedback = analyze_job_match(
            resume.extracted_text,
            job.description
        )

    except Exception as e:
        print("Gemini Error:", e)

    return {
        "resume_id": resume.id,
        "job_id": job.id,
        "job_title": job.title,
        "match_score": local_result["match_score"],
        "matched_skills": local_result["matched_skills"],
        "missing_skills": local_result["missing_skills"],
        "ai_feedback": ai_feedback
    }