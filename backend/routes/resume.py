from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from typing import List

import shutil
import os
import json

from database import get_db
from models import Resume
from resume_parser import extract_text
from utils.skill_extractor import analyze_resume
from utils.gemini_ai import analyze_resume_ai
from utils.auth_utils import get_current_user


router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)



# ---------------------------------
# Single Resume Upload
# ---------------------------------

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    file_path = f"{UPLOAD_FOLDER}/{file.filename}"


    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )


    text = extract_text(file_path)


    result = analyze_resume(text)

    try:
         ai_feedback = analyze_resume_ai(text)
    except Exception as e:
         print("Gemini Error:", e)
         ai_feedback = {
              "summary": "AI feedback is temporarily unavailable.",
              "strengths": [],
              "weaknesses": [],
              "suggestions": [
             "Gemini API quota exceeded or unavailable. Resume analysis completed successfully."
        ]
    }

    resume = Resume(

        filename=file.filename,

        extracted_text=text,

        score=result["score"],

        skills=json.dumps(
            result["detected_skills"]
        ),

        missing_skills=json.dumps(
            result["missing_skills"]
        ),

        ai_feedback=json.dumps(
            ai_feedback
        ),

       user_id=current_user["user_id"]

    )


    db.add(resume)

    db.commit()

    db.refresh(resume)



    return {

        "message": "Resume analyzed and saved successfully",

        "resume_id": resume.id,

        "analysis": {

            "ats_score": result["score"],

            "detected_skills": result["detected_skills"],

            "missing_skills": result["missing_skills"],

            "ai_feedback": ai_feedback

        }

    }





# ---------------------------------
# Bulk Resume Upload
# ---------------------------------

@router.post("/bulk-upload")
async def bulk_upload_resume(
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    uploaded_resumes = []


    for file in files:


        file_path = f"{UPLOAD_FOLDER}/{file.filename}"


        with open(file_path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )



        text = extract_text(file_path)



        result = analyze_resume(text)


        try:

             ai_feedback = analyze_resume_ai(text)

        except Exception as e:
            print("Gemini Error:", e)
            ai_feedback = {
                "summary": "AI feedback is temporarily unavailable.",
                "strengths": [],
                "weaknesses": [],
                "suggestions": [
                "Gemini API quota exceeded or unavailable. Resume analysis completed successfully."
        ]
    }

        resume = Resume(

            filename=file.filename,

            extracted_text=text,

            score=result["score"],

            skills=json.dumps(
                result["detected_skills"]
            ),

            missing_skills=json.dumps(
                result["missing_skills"]
            ),

            ai_feedback=json.dumps(
                ai_feedback
            ),

            user_id=current_user["user_id"]

        )



        db.add(resume)

        db.commit()

        db.refresh(resume)



        uploaded_resumes.append({

            "resume_id": resume.id,

            "filename": resume.filename,

            "ats_score": resume.score

        })



    return {

        "message": "Bulk resume upload completed",

        "total_uploaded": len(uploaded_resumes),

        "resumes": uploaded_resumes

    }





# ---------------------------------
# My Resume History
# ---------------------------------

@router.get("/my-resumes")
def get_my_resumes(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    resumes = db.query(Resume).filter(
        Resume.user_id == current_user["user_id"]
    ).all()



    result = []


    for resume in resumes:

        result.append({

            "resume_id": resume.id,

            "filename": resume.filename,

            "ats_score": resume.score,

            "skills": json.loads(resume.skills)
            if resume.skills else [],

            "missing_skills": json.loads(resume.missing_skills)
            if resume.missing_skills else [],

            "ai_feedback": json.loads(resume.ai_feedback)
            if resume.ai_feedback else {}

        })


    return result





# ---------------------------------
# Get Single Resume
# ---------------------------------

@router.get("/{resume_id}")
def get_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user["user_id"]
    ).first()



    if not resume:

        return {
            "message": "Resume not found"
        }



    return {

        "resume_id": resume.id,

        "filename": resume.filename,

        "ats_score": resume.score,

        "skills": json.loads(resume.skills),

        "missing_skills": json.loads(
            resume.missing_skills
        ),

        "ai_feedback": json.loads(
            resume.ai_feedback
        )

    }





# ---------------------------------
# Delete Resume
# ---------------------------------

@router.delete("/{resume_id}")
def delete_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user["user_id"]
    ).first()



    if not resume:

        return {
            "message": "Resume not found"
        }



    db.delete(resume)

    db.commit()



    return {

        "message": "Resume deleted successfully"

    }