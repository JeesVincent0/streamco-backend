import { Email } from '@/modules/user/domain/value-objects';
import { MailService } from '../../application/ports';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export class NodemailerService extends MailService {
  private readonly transporter: Transporter;

  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USER!,
        pass: process.env.NODEMAILER_PASS!,
      },
    });
  }

  async sendOtp(email: Email, otp: number): Promise<void> {
    await this.transporter.sendMail({
      from: {
        name: 'Auth Service',
        address: 'jeesvincent0@gmail.com',
      },
      to: email.getValue(),
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}`,
    });
  }
}
