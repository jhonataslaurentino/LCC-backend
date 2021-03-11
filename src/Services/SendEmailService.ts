import { SendMailOptions } from 'nodemailer';
import transporter from '../config/email';

class SendEmailService {
  public async execute(mailOptions: SendMailOptions): Promise<boolean> {
    return transporter
      .sendMail(mailOptions)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}

export default SendEmailService;
