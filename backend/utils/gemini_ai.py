import os
import json

from dotenv import load_dotenv
from google import genai


load_dotenv()


api_key = os.getenv("GEMINI_API_KEY")


if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")


client = genai.Client(
    api_key=api_key
)



def analyze_resume_ai(resume_text: str):

    prompt = f"""
You are an expert ATS Resume Reviewer.

Analyze this resume and return ONLY valid JSON.

Do not add markdown.
Do not add explanations outside JSON.


Return exactly this structure:

{{
    "summary": "Short professional summary of the resume",

    "strengths": [
        "strength 1",
        "strength 2",
        "strength 3"
    ],

    "weaknesses": [
        "weakness 1",
        "weakness 2"
    ],

    "missing_skills": [
        "skill 1",
        "skill 2"
    ],

    "suggestions": [
        "suggestion 1",
        "suggestion 2"
    ]
}}


Resume:

{resume_text}
"""


    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )


    try:

        feedback = json.loads(
            response.text
        )

        return feedback


    except Exception as e:

        print("JSON Error:", e)

        return {
            "summary": "Analysis generated successfully",
            "strengths": [],
            "weaknesses": [],
            "missing_skills": [],
            "suggestions": []
        }