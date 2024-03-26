import nodemailer from 'nodemailer';

import jwt from 'jsonwebtoken';

import { renderHtml } from '../utilis/renderHtml';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD
  }
});

export const sendVerificationCode = async (email: string, user_id: number, user_name: string) => {
  try {
    const token = jwt.sign(
      {
        email,
        userId: user_id
      },
      process.env.SECRETKEY,
      {
        expiresIn: '1h'
      }
    );

    const data = {
      user_name,
      token,
      port: process.env.PORT || 5000
    };

    const html = await renderHtml('verification.hbs', data);

    const mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: 'Registration Confirmation',
      html
    };

    await transporter.sendMail(mailOptions);
  } catch (e) {
    console.error(e);
    throw new Error('Failed to send verification mail.');
  }
};

export const sendPasswordResetMail = async (email: string, user_name: string, link: string) => {
  try {
    const data = {
      user_name,
      link
    };

    const html = await renderHtml('resetPassword.hbs', data);

    const mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: 'Reset Password',
      html
    };

    await transporter.sendMail(mailOptions);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};
