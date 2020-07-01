import * as nodemailer from 'nodemailer';
import { Logger } from '@nestjs/common';

export class Mail {
  private logger = new Logger('Mailler');
  constructor(
    public to?: string,
    public subject?: string,
    public message?: string,
  ) {}
  async sendMail(): Promise<string> {
    const mailOptions = {
      from: 'rachel.heller10@ethereal.email',
      to: this.to,
      subject: this.subject,
      html: this.message,
    };
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'rachel.heller10@ethereal.email',
        pass: 'TjaNKM4bZZGEEMprQ2',
      },
    });

    return transporter.sendMail(mailOptions, error => {
      if (error) {
        return error;
      } else {
        return 'E-mail enviado com sucesso!';
      }
    });
  }
}
