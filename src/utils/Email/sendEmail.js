'use server';

import { template } from './emailTemplates';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send emails
export async function sendEmail({ email, subject, message, image, type }) {
    if (!email) {
        return { success: false, message: 'Email is required' };
    }

    let mailOptions = {
        from: process.env.EMAIL_FROM,
        to: reqBody.email,
        subject: subject,
        html: template(type, message),
        attachments: [],
    };

    if (image) {
        mailOptions.attachments.push({
            filename: 'QR Ticket.png',
            path: image, // Path to image provided in the request
            cid: 'ticket', // same cid value as in the html img src
        });
    }
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Internal Server Error' };
    }
}
