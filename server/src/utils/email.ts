import nodemailer from 'nodemailer';
import { env } from '../env';
import { EmailData } from '../repositories/email.repository';

export const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.NODE_ENV === 'production',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export async function buildEmail(code: string, to: string, subject: string): Promise<EmailData | null> {
  try {
    return {
      from: env.EMAIL_USER,
      to,
      subject,
      html: `
        <html lang="pt-BR">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Código de Autenticação</title>
            <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .email-header {
                  text-align: center;
                  padding-bottom: 20px;
                  border-bottom: 1px solid #dddddd;
              }
            .email-header h1 {
                color: #333333;
            }
            .email-body {
                margin-top: 20px;
                text-align: center;
            }
            .email-body p {
                font-size: 16px;
                color: #555555;
            }
            .code-box {
                margin: 20px auto;
                padding: 15px;
                background-color: #f0f0f0;
                border-radius: 5px;
                font-size: 24px;
                letter-spacing: 2px;
                font-weight: bold;
                color: #333333;
                display: inline-block;
            }
            .email-footer {
                margin-top: 30px;
                text-align: center;
                font-size: 12px;
                color: #999999;
            }
          </style>
      </head>
      <body>
        <div class="email-container">
            <div class="email-header">
                <h1>Seu Código de Autenticação</h1>
            </div>
            <div class="email-body">
                <p>Olá,</p>
                <p>Use o código abaixo para completar sua autenticação:</p>
                <div class="code-box">${code}</div>
                <p>Este e-mail é automático. Por favor, não responda.</p>
                <p>Se você não solicitou este código, por favor, ignore este e-mail.</p>
            </div>
            <div class="email-footer">
                <p>© 2024 Gymsign. Todos os direitos reservados.</p>
            </div>
        </div>
    </body>
    </html>
      `,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}
