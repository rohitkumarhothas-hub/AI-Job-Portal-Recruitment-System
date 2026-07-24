from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.responses import FileResponse
import os

from database import get_db
from models import Application, Job, Resume, User

from utils.auth_utils import (
    require_candidate,
    require_recruiter
)

from utils.email_service import send_email


router = APIRouter(
    prefix="/applications",
    tags=["Applications"]
)



# ---------------------------------
# Candidate Apply Job
# ---------------------------------

@router.post("/apply/{job_id}")
def apply_job(
    job_id: int,
    resume_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(require_candidate)
):

    job = db.query(Job).filter(
        Job.id == job_id
    ).first()


    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )


    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user["user_id"]
    ).first()


    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )


    existing = db.query(Application).filter(
        Application.candidate_id == current_user["user_id"],
        Application.job_id == job_id
    ).first()


    if existing:
        return {
            "message":"Already applied for this job"
        }



    application = Application(

        candidate_id=current_user["user_id"],

        job_id=job_id,

        resume_id=resume_id,

        status="Applied",

        match_score=0

    )


    db.add(application)

    db.commit()

    db.refresh(application)



    return {

        "message":"Job applied successfully",

        "application_id":application.id

    }





# ---------------------------------
# Candidate View Applications
# ---------------------------------

@router.get("/my-applications")
def my_applications(

    db: Session = Depends(get_db),

    current_user = Depends(require_candidate)

):


    applications = db.query(Application).filter(

        Application.candidate_id == current_user["user_id"]

    ).all()



    result = []


    for app in applications:


        job = db.query(Job).filter(
            Job.id == app.job_id
        ).first()



        result.append({

            "application_id":app.id,

            "job_title":job.title if job else "Unknown",

            "status":app.status,

            "match_score":app.match_score

        })



    return result





# ---------------------------------
# Recruiter View Applicants By Job
# ---------------------------------

@router.get("/job/{job_id}/applicants")
def view_applicants(

    job_id:int,

    db:Session = Depends(get_db),

    current_user = Depends(require_recruiter)

):


    applications = db.query(Application).filter(

        Application.job_id == job_id

    ).all()



    result = []


    for app in applications:


        resume = db.query(Resume).filter(

            Resume.id == app.resume_id

        ).first()



        result.append({

            "application_id":app.id,

            "candidate_id":app.candidate_id,

            "resume_id":app.resume_id,

            "resume_name":resume.filename if resume else "Unknown",

            "resume_score":resume.score if resume else 0,

            "status":app.status,

            "match_score":app.match_score

        })


    return result





# ---------------------------------
# Recruiter View All Applications
# ---------------------------------

@router.get("/all")
def all_applications(

    db: Session = Depends(get_db),

    current_user = Depends(require_recruiter)

):


    applications = db.query(Application).all()


    result = []


    for app in applications:


        job = db.query(Job).filter(
            Job.id == app.job_id
        ).first()



        resume = db.query(Resume).filter(
            Resume.id == app.resume_id
        ).first()



        candidate = db.query(User).filter(
            User.id == app.candidate_id
        ).first()



        result.append({

            "application_id":app.id,

            "job_title":job.title if job else "Unknown",

            "resume_id":app.resume_id,

            "resume_name":resume.filename if resume else "Unknown",

            "status":app.status,

            "match_score":app.match_score,

            "skills":
                resume.skills.split(",")
                if resume and resume.skills
                else [],

            "candidate_name":
                candidate.name if candidate else "Unknown",

            "candidate_email":
                candidate.email if candidate else ""

        })


    return result





# ---------------------------------
# Recruiter View Resume Details
# ---------------------------------

@router.get("/resume/{resume_id}")
def view_resume(

    resume_id:int,

    db:Session = Depends(get_db),

    current_user = Depends(require_recruiter)

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

        "resume_id":resume.id,

        "filename":resume.filename,

        "ats_score":resume.score,

        "skills":resume.skills,

        "missing_skills":resume.missing_skills,

        "ai_feedback":resume.ai_feedback,

        "resume_text":resume.extracted_text

    }





# ---------------------------------
# Recruiter View Original PDF Resume
# ---------------------------------

@router.get("/resume-file/{resume_id}")
def view_resume_file(

    resume_id:int,

    db:Session = Depends(get_db),

    current_user = Depends(require_recruiter)

):


    resume = db.query(Resume).filter(

        Resume.id == resume_id

    ).first()



    if not resume:

        raise HTTPException(

            status_code=404,

            detail="Resume not found"

        )



    file_path = f"uploads/{resume.filename}"



    if not os.path.exists(file_path):

        raise HTTPException(

            status_code=404,

            detail="Resume file not found"

        )



    return FileResponse(

        path=file_path,

        filename=resume.filename,

        media_type="application/pdf"

    )





# ---------------------------------
# Recruiter Update Application Status
# ---------------------------------

@router.put("/{application_id}/status")
def update_status(

    application_id:int,

    status:str,

    db:Session = Depends(get_db),

    current_user = Depends(require_recruiter)

):


    application = db.query(Application).filter(

        Application.id == application_id

    ).first()



    if not application:

        raise HTTPException(

            status_code=404,

            detail="Application not found"

        )


    application.status = status


    db.commit()



    # Send email when shortlisted

    if status == "Shortlisted":


        candidate = db.query(User).filter(
            User.id == application.candidate_id
        ).first()



        job = db.query(Job).filter(
            Job.id == application.job_id
        ).first()



        if candidate and candidate.email:


            send_email(

                candidate.email,

                "Application Shortlisted",

                f"""
Hello {candidate.name},

Congratulations!

Your application has been shortlisted.

Position:
{job.title}

Company:
{job.company}

Location:
{job.location}

Our recruitment team will contact you soon.

Regards,
AI Resume Analyzer Team
"""

            )



    return {

        "message":"Application status updated"

    }