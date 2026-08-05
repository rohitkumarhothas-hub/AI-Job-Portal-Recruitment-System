AI Resume Analyzer & Role-Based Job Recruitment Platform

## Description

The **AI-Powered Job Portal and Recruitment Management System** is a full-stack web application designed to make the recruitment process easier, faster, and more efficient for both candidates and recruiters.

The platform allows candidates to register, upload resumes, analyze their skills, search for jobs, and apply for suitable opportunities. Recruiters can create job postings, manage applications, and find the right candidates through an organized recruitment process.

The system uses AI-based resume analysis to evaluate resumes, extract important skills, generate ATS scores, and improve candidate-job matching.

## Features

**Candidate Module**
- Candidate registration and login
- Email OTP verification
- Profile management
- Resume upload and management
- AI resume analysis
- ATS score evaluation
- Skill extraction from resumes
- Job search and job matching
- Application tracking

**Recruiter Module**
- Recruiter registration and login
- Create and manage job posts
- View candidate applications
- Review candidate resumes
- Manage recruitment activities

**AI Features**
- Resume analysis using AI
- Automatic skill extraction
- ATS score generation
- Resume improvement suggestions
- Candidate and job matching

**Technology Stack**

- Frontend: React.js, JavaScript, CSS, Vite
- Backend: Python, FastAPI
- Database: SQLite, SQLAlchemy
- Authentication: JWT Authentication
- AI Processing: Resume Parsing and NLP
- Tools: Git, GitHub, VS Code

## Project Objective

The main objective of this project is to build an intelligent recruitment platform that reduces manual resume screening and helps recruiters identify suitable candidates while providing candidates with better job opportunities.

## Future Scope

- Cloud deployment
- Advanced AI interview assistance
- Real-time notifications
- Improved recommendation system

## How to Run the Project

### Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
2. Create and activate virtual environment:
python -m venv venv
Activate virtual environment:
Mac/Linux:
source venv/bin/activate
Windows:
venv\Scripts\activate
3. Install backend dependencies:
pip install -r requirements.txt
4. Start the FastAPI server:
uvicorn main:app --reload
Backend will run at:
http://127.0.0.1:8000

Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
cd frontend
2. Install frontend dependencies:
npm install
3. Start the React application:
npm run dev
Frontend will run at:
http://localhost:5174
Application Flow

1. User creates an account through registration.
2. Email OTP verification is completed.
3. User logs in securely.
4. Candidates can upload resumes and get AI-based resume analysis.
5. Recruiters can create job postings and manage applications.
6. AI features help with resume evaluation and candidate-job matching.
