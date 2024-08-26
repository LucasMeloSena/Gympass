import { transporter } from '../../utils/email';
import { EmailData, EmailRepository } from '../email.repository';

export class NodemailerRepository implements EmailRepository {
  async send(data: EmailData) {
    await transporter.sendMail(data);
  }
}
