from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError


SECRET_KEY = "resume_analyzer_secret_key"

ALGORITHM = "HS256"


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)



# ---------------------------------
# Get Logged In User
# ---------------------------------

def get_current_user(
    token: str = Depends(oauth2_scheme)
):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )


        user_id = payload.get(
            "user_id"
        )


        role = payload.get(
            "role"
        )


        if user_id is None:

            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )


        return {

            "user_id": user_id,

            "role": role

        }



    except JWTError:


        raise HTTPException(

            status_code=401,

            detail="Invalid token"

        )





# ---------------------------------
# Recruiter Permission
# ---------------------------------

def require_recruiter(

    current_user: dict = Depends(get_current_user)

):


    if current_user["role"] != "recruiter":

        raise HTTPException(

            status_code=403,

            detail="Recruiter access required"

        )


    return current_user






# ---------------------------------
# Candidate Permission
# ---------------------------------

def require_candidate(

    current_user: dict = Depends(get_current_user)

):


    if current_user["role"] != "candidate":

        raise HTTPException(

            status_code=403,

            detail="Candidate access required"

        )


    return current_user