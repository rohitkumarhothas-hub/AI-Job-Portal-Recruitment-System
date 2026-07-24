from utils.gemini_ai import analyze_resume_ai

print("Step 1: Script started")

resume = """
Python Developer

Skills:
Python
FastAPI
SQL
Docker

Experience:
Built REST APIs using FastAPI.
"""

print("Step 2: Calling Gemini...")

result = analyze_resume_ai(resume)

print("Step 3: Gemini responded")

print(result)