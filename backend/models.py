from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime


# ---------------------------------
# User Model
# ---------------------------------

class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String
    )

    email = Column(
        String,
        unique=True,
        index=True
    )

    password = Column(
        String
    )

    # candidate / recruiter

    role = Column(
        String,
        default="candidate"
    )


    # ---------------------------------
    # Email OTP Verification
    # ---------------------------------

    is_verified = Column(
        Integer,
        default=0
    )


    email_otp = Column(
        String,
        nullable=True
    )


    otp_expiry = Column(
        DateTime,
        nullable=True
    )


    # ---------------------------------
    # Relationships
    # ---------------------------------

    resumes = relationship(
        "Resume",
        back_populates="user"
    )


    applications = relationship(
        "Application",
        back_populates="candidate"
    )



# ---------------------------------
# Resume Model
# ---------------------------------

class Resume(Base):

    __tablename__ = "resumes"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    filename = Column(
        String
    )


    extracted_text = Column(
        Text
    )


    score = Column(
        Integer
    )


    skills = Column(
        Text
    )


    missing_skills = Column(
        Text
    )


    ai_feedback = Column(
        Text
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )


    user = relationship(
        "User",
        back_populates="resumes"
    )



# ---------------------------------
# Job Model
# ---------------------------------

class Job(Base):

    __tablename__ = "jobs"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    title = Column(
        String
    )


    company = Column(
        String
    )


    location = Column(
        String
    )


    description = Column(
        Text
    )


    required_skills = Column(
        Text
    )


    apply_link = Column(
        String
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


    applications = relationship(
        "Application",
        back_populates="job"
    )



# ---------------------------------
# Job Application Model
# ---------------------------------

class Application(Base):

    __tablename__ = "applications"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    candidate_id = Column(
        Integer,
        ForeignKey("users.id")
    )


    job_id = Column(
        Integer,
        ForeignKey("jobs.id")
    )


    resume_id = Column(
        Integer,
        ForeignKey("resumes.id")
    )


    status = Column(
        String,
        default="Applied"
    )


    match_score = Column(
        Integer,
        default=0
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


    candidate = relationship(
        "User",
        back_populates="applications"
    )


    job = relationship(
        "Job",
        back_populates="applications"
    )


    resume = relationship(
        "Resume"
    )