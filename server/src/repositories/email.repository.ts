export interface EmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export interface EmailRepository {
  send(data: EmailData): Promise<void>;
}
