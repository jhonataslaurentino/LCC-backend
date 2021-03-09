import { SendMailOptions } from 'nodemailer';
import transporter from '../config/email';

class SendEmailService {
  public async execute(mailOptions: SendMailOptions): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const wasEmailSent = true;
      transporter.sendMail(mailOptions, error => {
        resolve(!error);
      });
      return wasEmailSent;
    });
  }
}

export default SendEmailService;
