"""Send a personalized, plain-text form confirmation over authenticated SMTP."""

from __future__ import annotations

import argparse
import os
import smtplib
import ssl
from email.header import Header
from email.mime.text import MIMEText
from email.utils import formataddr, parseaddr
from urllib.parse import urlparse


def required_env(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


def clean_header(value: str, field_name: str) -> str:
    value = value.strip()
    if not value or "\r" in value or "\n" in value:
        raise ValueError(f"Invalid {field_name}")
    return value


def validate_email(value: str, field_name: str) -> str:
    value = clean_header(value, field_name)
    _, address = parseaddr(value)
    if address != value or "@" not in address:
        raise ValueError(f"Invalid {field_name}")
    return address


def validate_confirmation_url(value: str) -> str:
    value = value.strip()
    parsed = urlparse(value)
    if parsed.scheme != "https" or not parsed.netloc:
        raise ValueError("CONFIRMATION_URL must be a complete HTTPS URL")
    return value


def build_message(user_email: str, user_name: str) -> tuple[MIMEText, str, str]:
    sender_email = validate_email(required_env("SMTP_FROM_EMAIL"), "sender email")
    sender_name = clean_header(
        os.environ.get("SMTP_FROM_NAME", "Aditya").strip() or "Aditya",
        "sender name",
    )
    confirmation_url = validate_confirmation_url(
        required_env("CONFIRMATION_URL"),
    )
    recipient_email = validate_email(user_email, "recipient email")
    recipient_name = clean_header(user_name, "recipient name")

    body = "\n".join(
        [
            f"Hi {recipient_name},",
            "",
            "Thanks for sending over the details for your Shopify store. "
            "I've received them and will take a look personally.",
            "",
            "If you want to add anything while I'm reviewing it, you can "
            "use this link:",
            confirmation_url,
            "",
            "I'll get back to you shortly.",
            "",
            sender_name,
        ],
    )
    message = MIMEText(
        body,
        _subtype="plain",
        _charset="utf-8",
    )
    message["Subject"] = Header(
        f"Got your request, {recipient_name}",
        "utf-8",
    )
    message["From"] = formataddr((sender_name, sender_email))
    message["To"] = recipient_email
    return message, sender_email, recipient_email


def send_primary_confirmation(user_email: str, user_name: str) -> None:
    smtp_host = required_env("SMTP_HOST")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = required_env("SMTP_USER")
    smtp_password = required_env("SMTP_PASS")
    use_implicit_tls = os.environ.get("SMTP_USE_SSL", "").lower() in {
        "1",
        "true",
        "yes",
    }
    message, sender_email, recipient_email = build_message(user_email, user_name)
    context = ssl.create_default_context()

    if use_implicit_tls:
        with smtplib.SMTP_SSL(
            smtp_host,
            smtp_port,
            context=context,
            timeout=30,
        ) as server:
            server.login(smtp_user, smtp_password)
            server.sendmail(
                sender_email,
                [recipient_email],
                message.as_string(),
            )
        return

    with smtplib.SMTP(smtp_host, smtp_port, timeout=30) as server:
        server.ehlo()
        server.starttls(context=context)
        server.ehlo()
        server.login(smtp_user, smtp_password)
        server.sendmail(
            sender_email,
            [recipient_email],
            message.as_string(),
        )


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Send a plain-text form confirmation email.",
    )
    parser.add_argument("email", help="Recipient email address")
    parser.add_argument("name", help="Recipient first name")
    args = parser.parse_args()

    send_primary_confirmation(args.email, args.name)
    print("Confirmation email sent.")


if __name__ == "__main__":
    main()
