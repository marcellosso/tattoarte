import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { subject, email, name, message } = req.body;

  console.log('email - ', email);
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS,
    cc: email,
    subject: `Message from ${name} (${email})`,
    text: message,
    // html: render(WelcomeEmail())
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return res.json({ message: 'Email sent' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
