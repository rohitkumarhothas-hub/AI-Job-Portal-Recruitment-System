import os

from dotenv import load_dotenv
from google import genai


load_dotenv()


client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)



def analyze_job_match(resume_text, job_description):

    prompt = f"""

You are an ATS recruitment expert.

Compare the candidate resume with the job description.

Return ONLY this JSON format:

{{
    "match_score": 0,
    "matched_skills": [],
    "missing_skills": [],
    "recommendations": []
}}


Resume:

{resume_text}



Job Description:

{job_description}

"""


    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )


    return response.text