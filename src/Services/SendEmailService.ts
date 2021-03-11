import { SendMailOptions } from 'nodemailer';
import transporter from '../config/email';
import endpointsConfig from '../config/endpoints.config';

interface Request extends SendMailOptions {
  template?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  context?: Object;
}

class SendEmailService {
  public async execute(mailOptions: Request): Promise<boolean> {
    return transporter
      .sendMail({
        ...mailOptions,
        from: `Plataforma LCC<${endpointsConfig.mailUserName}>`,
      } as SendMailOptions)
      .then(() => {
        return true;
      })
      .catch(info => {
        console.log(info);
        return false;
      });
  }
}

export default SendEmailService;
