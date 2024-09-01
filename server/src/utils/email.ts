import nodemailer from 'nodemailer';
import { env } from '../env';
import { EmailData } from '../repositories/email.repository';
import fs from 'node:fs';

export const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.NODE_ENV === 'production',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export async function buildEmail(templatePath: string, code: string, dataToReplace: string, to: string, subject: string): Promise<EmailData | null> {
  try {
    const data = fs.readFileSync(templatePath, 'utf8');
    const emailHtml = data.replace(dataToReplace, code);

    return {
      from: env.EMAIL_USER,
      to,
      subject,
      html: emailHtml,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}
