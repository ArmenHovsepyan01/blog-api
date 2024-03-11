import nodemailer from 'nodemailer';

import * as crypto from 'crypto';

import { VerificationCodes } from '../database/models/models';

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
    const verificationCode = crypto.randomBytes(6).toString('hex');

    const html = `<div xmlns="http://www.w3.org/1999/html">
    <h3>Hey ${user_name}!</h3>
    <span>Verification code: <strong>${verificationCode}</strong></span> 
    <p>Please go to <a href="http://localhost:3000/verify">Verification page</a> 
    and pass verification by this code.</p>
</div>`;

    const mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: 'Registration Confirmation',
      html
    };

    await transporter.sendMail(mailOptions);

    await VerificationCodes.create({ user_id, code: verificationCode });

    return verificationCode;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to send verification mail.');
  }
};

export const sendPasswordResetMail = async (email: string, userName: string, link: string) => {
  try {
    const html = `<div>
      <h3>Hi ${userName}!</h3>
      <span>You requested to reset your password.</span> 
      </br>
      <span>Please click the link below to reset password</span>
      </br>
     <a href=${link}>Reset password</a>
    </div>`;

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
