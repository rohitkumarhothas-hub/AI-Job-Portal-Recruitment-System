from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from datetime import datetime, timedelta
import random
import re

from database import get_db
from models import User
from schemas import UserCreate
from utils.email_service import send_email


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


SECRET_KEY = "resume_analyzer_secret_key"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60



# ---------------------------------
# Create JWT Token
# ---------------------------------

def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )



# ---------------------------------
# Generate OTP
# ---------------------------------

def generate_otp():

    return str(
        random.randint(
            100000,
            999999
        )
    )



# ---------------------------------
# Email Validation
# ---------------------------------

def validate_email(email):

    pattern = r"^[a-zA-Z0-9._%+-]+@gmail\.com$"

    return re.match(pattern, email)



# ---------------------------------
# Register User + Send OTP
# ---------------------------------

@router.post("/register")
def register_user(

    user: UserCreate,

    db: Session = Depends(get_db)

):


    # Check Gmail format

    if not validate_email(user.email):

        raise HTTPException(

            status_code=400,

            detail="Please enter a valid Gmail address"

        )



    existing_user = db.query(User).filter(

        User.email == user.email

    ).first()



    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="Email already registered"

        )



    otp = generate_otp()



    new_user = User(

        name=user.name,

        email=user.email,

        password=user.password,

        role=user.role,

        is_verified=0,

        email_otp=otp,

        otp_expiry=datetime.utcnow() + timedelta(minutes=5)

    )


    db.add(new_user)

    db.commit()

    db.refresh(new_user)



    print("OTP sending to:", new_user.email)



    send_email(

        new_user.email,

        "AI Resume Analyzer - OTP Verification",

f"""
Hello {new_user.name},

Your verification OTP is:

{otp}

This OTP is valid for 5 minutes.

Regards,
AI Resume Analyzer Team
"""

    )


    return {

        "message":"OTP sent to your email",

        "email":new_user.email

    }




# ---------------------------------
# Verify OTP
# ---------------------------------

@router.post("/verify-otp")
def verify_otp(

    email:str,

    otp:str,

    db:Session = Depends(get_db)

):


    user=db.query(User).filter(

        User.email==email

    ).first()



    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found"

        )



    if user.email_otp != otp:

        raise HTTPException(

            status_code=400,

            detail="Invalid OTP"

        )



    if user.otp_expiry < datetime.utcnow():

        raise HTTPException(

            status_code=400,

            detail="OTP expired"

        )



    user.is_verified=1

    user.email_otp=None

    user.otp_expiry=None


    db.commit()



    return {

        "message":"Email verified successfully"

    }





# ---------------------------------
# Resend OTP
# ---------------------------------

@router.post("/resend-otp")
def resend_otp(

    email:str,

    db:Session=Depends(get_db)

):


    user=db.query(User).filter(

        User.email==email

    ).first()



    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found"

        )


    otp=generate_otp()


    user.email_otp=otp

    user.otp_expiry=datetime.utcnow()+timedelta(minutes=5)


    db.commit()



    send_email(

        user.email,

        "AI Resume Analyzer - New OTP",

f"""
Hello {user.name},

Your new OTP is:

{otp}

Valid for 5 minutes.

Regards,
AI Resume Analyzer Team
"""

    )


    return {

        "message":"New OTP sent"

    }




# ---------------------------------
# Login User
# ---------------------------------

@router.post("/login")
def login_user(

    form_data:OAuth2PasswordRequestForm=Depends(),

    db:Session=Depends(get_db)

):


    user=db.query(User).filter(

        User.email==form_data.username

    ).first()



    if not user:

        raise HTTPException(

            status_code=401,

            detail="Invalid email or password"

        )



    if user.password != form_data.password:

        raise HTTPException(

            status_code=401,

            detail="Invalid email or password"

        )



    if user.is_verified==0:

        raise HTTPException(

            status_code=401,

            detail="Please verify email using OTP first"

        )



    token=create_access_token({

        "user_id":user.id,

        "role":user.role

    })



    return {

        "access_token":token,

        "token_type":"bearer",

        "role":user.role

    }