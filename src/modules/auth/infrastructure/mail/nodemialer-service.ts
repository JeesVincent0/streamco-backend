import { Email } from '@/modules/user/domain/value-objects';
import { IMailService } from '../../application/ports';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { BadRequestError } from '@/shared/errors';

export class NodemailerService implements IMailService {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USER!,
        pass: process.env.NODEMAILER_PASS!,
      },
    });
  }

  async sendOtp(email: Email, otp: number): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: {
          name: 'Auth Service',
          address: 'jeesvincent0@gmail.com',
        },
        to: email.getValue(),
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}`,
      });
    } catch (error) {
      throw new BadRequestError('Failed to send OTP email');
    }
  }
}
