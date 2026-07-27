from dotenv import load_dotenv
load_dotenv()

import os
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException

print("🔥 BREVO API EMAIL SERVICE LOADED")


def send_email(receiver_email, subject, body):

    print("🚀 SEND_EMAIL FUNCTION CALLED")

    try:

        api_key = os.getenv("BREVO_API_KEY")
        sender_email = os.getenv("SENDER_EMAIL")
        sender_name = os.getenv("SENDER_NAME", "AI Resume Analyzer")

        print("API KEY FOUND:", bool(api_key))
        print("SENDER EMAIL:", sender_email)
        print("RECEIVER EMAIL:", receiver_email)

        configuration = sib_api_v3_sdk.Configuration()
        configuration.api_key["api-key"] = api_key

        api_client = sib_api_v3_sdk.ApiClient(configuration)
        api_instance = sib_api_v3_sdk.TransactionalEmailsApi(api_client)

        email = sib_api_v3_sdk.SendSmtpEmail(
            sender={
                "name": sender_name,
                "email": sender_email
            },
            to=[
                {
                    "email": receiver_email
                }
            ],
            subject=subject,
            html_content=body
        )

        response = api_instance.send_transac_email(email)

        print("✅ BREVO RESPONSE:", response)
        print("✅ Email sent successfully to:", receiver_email)

        return True

    except ApiException as e:

        print("❌ BREVO API ERROR")
        print("Status:", e.status)
        print("Reason:", e.reason)
        print("Headers:", e.headers)
        print("Body:", e.body)

        return False

    except Exception as e:

        print("❌ EMAIL ERROR:", repr(e))

        return False