import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

type mailOptions = {
  subject: string;
  email: string;
  firstName: string;
  lastName: string;
  activationCode: string;
  template: string;
};
@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}

  async sendMail({
    subject,
    email,
    firstName,
    lastName,
    activationCode,
    template,
  }: mailOptions) {
    await this.mailService.sendMail({
      to: email,
      subject,
      template,
      context: {
        firstName,
        lastName,
        activationCode,
      },
    });
  }
}
