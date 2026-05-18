'use server';

import { template } from './emailTemplates';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendEmail({ email, subject, message, image, type }) {
    if (!email) {
        return { success: false, message: 'Email is required' };
    }

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject,
        html: template({ type, message }),
        attachments: [],
    };

    if (image) {
        mailOptions.attachments.push({
            filename: 'QR Ticket.png',
            path: image,
            cid: 'ticket',
        });
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Email error:', error);
        return { success: false, message: 'Internal Server Error' };
    }
}
