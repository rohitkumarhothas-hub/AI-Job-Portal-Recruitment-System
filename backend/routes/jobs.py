from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db
from models import Job

from utils.auth_utils import require_recruiter


router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)



# -----------------------------
# Job Schema
# -----------------------------

class JobCreate(BaseModel):

    title: str

    company: str

    location: str

    description: str

    required_skills: str

    apply_link: str





# -----------------------------
# Create Job (Recruiter)
# -----------------------------

@router.post("/")
def create_job(

    job_data: JobCreate,

    db: Session = Depends(get_db),

    current_user = Depends(require_recruiter)

):


    job = Job(

        title=job_data.title,

        company=job_data.company,

        location=job_data.location,

        description=job_data.description,

        required_skills=job_data.required_skills,

        apply_link=job_data.apply_link

    )


    db.add(job)

    db.commit()

    db.refresh(job)


    return {

        "message":"Job created successfully",

        "job_id":job.id

    }





# -----------------------------
# Candidate View Jobs
# -----------------------------

@router.get("/")
def get_jobs(

    db: Session = Depends(get_db)

):


    jobs = db.query(Job).all()


    return [

        {

            "id":job.id,

            "title":job.title,

            "company":job.company,

            "location":job.location,

            "description":job.description,

            "required_skills":job.required_skills,

            "apply_link":job.apply_link

        }

        for job in jobs

    ]





# -----------------------------
# Single Job
# -----------------------------

@router.get("/{job_id}")
def get_job(

    job_id:int,

    db:Session = Depends(get_db)

):


    job=db.query(Job).filter(
        Job.id==job_id
    ).first()



    if not job:

        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )



    return {

        "id":job.id,

        "title":job.title,

        "company":job.company,

        "location":job.location,

        "description":job.description,

        "required_skills":job.required_skills,

        "apply_link":job.apply_link

    }





# -----------------------------
# Delete Job
# -----------------------------

@router.delete("/{job_id}")
def delete_job(

    job_id:int,

    db:Session=Depends(get_db),

    current_user=Depends(require_recruiter)

):


    job=db.query(Job).filter(
        Job.id==job_id
    ).first()



    if not job:

        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )



    db.delete(job)

    db.commit()



    return {

        "message":"Job deleted successfully"

    }