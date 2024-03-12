import nodemailer from 'nodemailer';

import jwt from 'jsonwebtoken';

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

    const html = `<div xmlns="http://www.w3.org/1999/html">
    <h3>Hey ${user_name}!</h3>
    <p>Please press this button to verify your account <a href="http://localhost:${process.env.PORT}/verify?token=${token}" style="text-decoration: none;color: black">
    <br>
    <button>Verify Account</button>
</a> 
</p>
</div>`;

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
