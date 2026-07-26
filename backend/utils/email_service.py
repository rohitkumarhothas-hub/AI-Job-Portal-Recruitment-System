from dotenv import load_dotenv
load_dotenv()

import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

print("🔥 BREVO SMTP EMAIL SERVICE LOADED")


def send_email(
    receiver_email,
    subject,
    body
):
    print("🚀 SEND_EMAIL FUNCTION CALLED")

    try:

        smtp_server = os.getenv("SMTP_SERVER")
        smtp_port = int(os.getenv("SMTP_PORT"))
        smtp_login = os.getenv("SMTP_LOGIN")
        smtp_password = os.getenv("SMTP_PASSWORD")
        sender_email = os.getenv("SENDER_EMAIL")


        print("SMTP SERVER:", smtp_server)
        print("SMTP LOGIN:", smtp_login)
        print("SENDER EMAIL:", sender_email)
        print("RECEIVER EMAIL:", receiver_email)


        message = MIMEMultipart()

        message["From"] = sender_email
        message["To"] = receiver_email
        message["Subject"] = subject


        message.attach(
            MIMEText(body, "html")
        )


        server = smtplib.SMTP(
            smtp_server,
            smtp_port
        )


        server.starttls()


        server.login(
            smtp_login,
            smtp_password
        )


        server.sendmail(
            sender_email,
            receiver_email,
            message.as_string()
        )


        server.quit()


        print(
            "✅ Email sent successfully to:",
            receiver_email
        )


        return True


    except Exception as e:

        print(
            "❌ EMAIL ERROR:",
            repr(e)
        )

        return False