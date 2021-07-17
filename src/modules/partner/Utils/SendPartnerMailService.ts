import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';
import endpointsConfig from '../../../config/endpoints.config';

interface ISendMailServiceDTO {
  to: string;
  subject: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  variables: object;
  path: string;
  from: string;
}

class SendPartnerMailService {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      host: 'smtpi.kinghost.net',
      port: 465,
      secure: true,
      auth: {
        user: endpointsConfig.partnerMailUserName,
        pass: endpointsConfig.partnerMailPassword,
      },
    });
  }

  async execute({
    from,
    path,
    subject,
    to,
    variables,
  }: ISendMailServiceDTO): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const mailTemplateParse = handlebars.compile(templateFileContent);
    const html = mailTemplateParse(variables);
    await this.client.sendMail({
      html,
      to,
      subject,
      from,
    });
  }
}

export { SendPartnerMailService };
