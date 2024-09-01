import nodemailer from 'nodemailer';
import { env } from '../env';
import { EmailData } from '../repositories/email.repository';
import fs from 'node:fs';
import ejs from 'ejs';

export const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.NODE_ENV === 'production',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export async function buildEmail(templatePath: string, code: string, to: string, subject: string): Promise<EmailData | null> {
  try {
    const codeObject = { AUTH_CODE: code };

    const renderTemplate = (templatePath: string, data: Record<string, string>) => {
      const template = fs.readFileSync(templatePath, 'utf-8');
      return ejs.render(template, data);
    };
    const htmlContent = renderTemplate(templatePath, codeObject);

    return {
      from: env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}
