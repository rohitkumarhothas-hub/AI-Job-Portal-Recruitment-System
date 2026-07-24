from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models import Base

from routes import auth, resume, analysis, jobs, applications



app = FastAPI(

    title="AI Resume Analyzer API",

    version="1.0.0",

    description="AI powered resume analysis and job application platform"

)



# ---------------------------------
# Create Database Tables
# ---------------------------------

Base.metadata.create_all(
    bind=engine
)





# ---------------------------------
# CORS Configuration
# ---------------------------------

app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        "http://localhost:5173",

        "http://localhost:5174"

    ],

    allow_credentials=True,

    allow_methods=[

        "GET",

        "POST",

        "PUT",

        "DELETE",

        "OPTIONS"

    ],

    allow_headers=[

        "Authorization",

        "Content-Type"

    ]

)





# ---------------------------------
# Include Routes
# ---------------------------------


app.include_router(
    auth.router
)


app.include_router(
    resume.router
)


app.include_router(
    analysis.router
)


app.include_router(
    jobs.router
)


app.include_router(
    applications.router
)







# ---------------------------------
# Home Route
# ---------------------------------

@app.get("/")
def home():

    return {


        "message":
        "AI Resume Analyzer Backend Running",


        "status":
        "success",


        "features":[


            "User Authentication",


            "Resume Upload",


            "AI Resume Analysis",


            "ATS Score",


            "Skill Detection",


            "Job Posting",


            "Job Search",


            "Job Applications"


        ]

    }







# ---------------------------------
# Test Route
# ---------------------------------

@app.get("/test")
def test():

    return {

        "message":
        "Backend is working"

    }