import { NextResponse } from 'next/server';

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

function template({ type, message }) {
    switch (type) {
        case 'reset':
            return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Request</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #e63946;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
      }
      .content h2 {
        color: #e63946;
        font-size: 20px;
        margin-bottom: 10px;
      }
      .content p {
        margin: 10px 0;
        line-height: 1.6;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 10px 0;
        background-color: #e63946;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        text-align: center;
      }
      .footer {
        text-align: center;
        padding: 10px;
        background-color: #f5f5f5;
        font-size: 12px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Reset Your Password</h1>
      </div>
      <div class="content">
        <h2>Hello ${message.name || 'User'},</h2>
        <p>
          We received a request to reset your password. Click the button below to set up a new password for your account:
        </p>
        <a href="${message.resetLink || '#'}" class="button">Reset Password</a>
        <p>
          If you didn't request a password reset, please ignore this email or contact support at 
          <a href="mailto:${message.contactEmail || 'support@example.com'}">${
                message.contactEmail || 'support@example.com'
            }</a>.
        </p>
        <p>This link will expire in 24 hours for your security.</p>
      </div>
      <div class="footer">
        <p>©️ ${new Date().getFullYear()} Event Registration Platform. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
    `;
        case 'verify':
            return `
            <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
      .header {
        background-color: #001f49a5;
        color: #ffffff;
        padding: 20px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
      }
      .content h2 {
        font-size: 20px;
        color: #001f49a5;
      }
      .content p {
        margin: 10px 0;
        line-height: 1.6;
      }
      .button {
        display: inline-block;
        margin: 20px 0;
        padding: 10px 20px;
        background-color: #001f49a5;
        color: #ffffff;
        text-decoration: none;
        font-size: 16px;
        border-radius: 5px;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Email Verification Required</h1>
      </div>
      <div class="content">
        <h2>Hi ${message.name || 'User'},</h2>
        <p>
          Thank you for signing up with us! To complete your registration, please
          verify your email address by clicking the button below.
        </p>
        <a href="${message.verifyLink}" class="button">Verify My Email</a>
        <p>
          If you did not sign up for this account, please ignore this email. Your email
          address will not be registered unless you verify it.
        </p>
      </div>
      <div class="footer">
        <p>Need help? Contact us at <a href="mailto:${
            message.contactEmail || 'support@example.com'
        }">${message.contactEmail || 'support@example.com'}</a>.</p>
        <p>©️ ${new Date().getFullYear()} Event Registration. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
            `;
        case 'ticket':
            return `
            <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Ticket Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #001f49a5;
        color: white;
        text-align: center;
        padding: 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
      }
      .content h2 {
        font-size: 20px;
        color: #001f49a5;
      }
      .content p {
        margin: 10px 0;
        line-height: 1.6;
      }
      .ticket-details {
        background: #f9f9f9;
        padding: 15px;
        border-radius: 5px;
        margin: 20px 0;
      }
      .ticket-details p {
        margin: 5px 0;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 20px;
        background-color: #001f49a5;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
      }
      .footer {
        text-align: center;
        padding: 10px;
        background-color: #f9f9f9;
        font-size: 12px;
        color: #666;
      }
      .footer a {
        color: #001f49a5;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Your Event Ticket</h1>
      </div>
      <div class="content">
        <h2>Hi ${message.name || 'Attendee'},</h2>
        <p>
          Thank you for registering for the <strong>${
              message.event || 'Event'
          }</strong>. Below are your ticket details:
        </p>
        <div class="ticket-details">
          <p><strong>Event:</strong> ${message.event || 'N/A'}</p>
          <p><strong>Order ID:</strong> ${message.orderId || 'N/A'}</p>
          <p><strong>Ticket ID:</strong> ${message.ticketId || 'N/A'}</p>
          <p><strong>Date:</strong> ${message.date || 'N/A'}</p>
          <p><strong>Location:</strong> ${message.location || 'N/A'}</p>
        </div>
      
        <p>
          Please make sure to bring a valid ID along with this ticket when attending the event.
        </p>
        <a href="${message.mapLink || '#'}" class="button">View Location</a>
      </div>
      <div class="footer">
        <p>
          Need help? Contact us at <a href="mailto:${
              message.contactEmail || 'support@example.com'
          }">${message.contactEmail || 'support@example.com'}</a>.
        </p>
        <p>©️ ${new Date().getFullYear()} Event Registration. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>

            `;
        default:
            return `
            <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #004aad;
        color: white;
        padding: 15px 20px;
        border-radius: 8px 8px 0 0;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 22px;
      }
      .content {
        padding: 20px;
      }
      .content p {
        margin: 10px 0;
        line-height: 1.6;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 15px 0;
        background-color: #004aad;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        font-size: 14px;
      }
      .footer {
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #666;
        background-color: #f5f5f5;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Notification</h1>
      </div>
      <div class="content">
        <p>${message || 'This is a generic notification message.'}</p>
        ${
            message.actionLink ? (
                <a href="${message.actionLink}" class="button">
                    ${message.actionText || 'Take Action'}
                </a>
            ) : (
                ''
            )
        }
      </div>
      <div class="footer">
        <p>
          If you have any questions, please contact us at 
          <a href="mailto:${message.contactEmail || 'support@example.com'}">${
                message.contactEmail || 'support@example.com'
            }</a>.
        </p>
        <p>©️ ${new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>

            `;
    }
}

export async function POST(req, res) {
    if (!req) {
        return NextResponse.json(
            { message: 'Structure is incorrect' },
            { status: 400 }
        );
    }

    let reqBody = await req?.json();

    if (!reqBody.email) {
        return NextResponse.json(
            { message: 'Email is required' },
            { status: 400 }
        );
    }

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: reqBody.email,
        subject: reqBody.subject,
        html: template(reqBody),
        attachments: [],
    };

    if (reqBody.message.image) {
        mailOptions.attachments.push({
            filename: 'QR Ticket.png',
            path: reqBody.message.image, // Path to image provided in the request
        });
    }

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return NextResponse.json(
                { message: 'Email not sent' },
                { status: 500 }
            );
        } else {
            console.log('Email sent: ' + info.response);
            return NextResponse.json(
                { message: 'Email sent' },
                { status: 200 }
            );
        }
    });

    return NextResponse.json({ message: 'sent' }, { status: 200 });
}
