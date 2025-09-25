import crypto from 'crypto';

// Function to send emails
export async function sendEmail({ email, subject, message, type }) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/mail`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                subject,
                message,
                type,
            }),
        }
    );

    return response;
}
