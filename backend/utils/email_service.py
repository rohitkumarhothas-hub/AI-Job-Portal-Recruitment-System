import os
import smtplib
from email.message import EmailMessage


def send_email(
    receiver_email,
    subject,
    body
):

    sender_email = os.getenv("MAIL_FROM")
    sender_password = os.getenv("MAIL_PASSWORD")


    if not sender_email or not sender_password:
        print("Email credentials missing")
        return



    message = EmailMessage()

    message["From"] = sender_email

    message["To"] = receiver_email

    message["Subject"] = subject

    message.set_content(body)



    try:

        smtp = smtplib.SMTP(
            "smtp.gmail.com",
            587
        )

        smtp.starttls()


        smtp.login(
            sender_email,
            sender_password
        )


        smtp.send_message(
            message
        )


        smtp.quit()


        print("Email sent successfully")


    except Exception as e:

        print(
            "Email sending failed:",
            e
        )