import { NextResponse } from 'next/server';

const nodemailer = require('nodemailer');

export async function POST(request: Request) {
  const { from, subject, message } = await request.json();

  // Nodemailer transport configuration
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from,
    to: process.env.EMAIL_USERNAME,
    subject: from + ' - ' + subject,
    text: message,
  };

  try {
    const res = await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully!',
      res
    });
  } catch (error) {
    console.error('Error sending email:', error);

    return NextResponse.json(
      { success: false, message: 'Error sending email' },
      { status: 500 }
    );
  }
}
