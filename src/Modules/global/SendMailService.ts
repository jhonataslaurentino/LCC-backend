import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import { resolve } from 'path';
import endpointsConfig from '../../config/endpoints.config';

interface ISendMailServiceDTO {
  to: string;
  subject: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  variables: object;
  path: string;
}

class SendMailService {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      host: 'smtpi.kinghost.net',
      port: 465,
      secure: true,
      auth: {
        user: endpointsConfig.mailUserName,
        pass: endpointsConfig.mailPassword,
      },
    });
  }

  async execute({
    path,
    subject,
    to,
    variables,
  }: ISendMailServiceDTO): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const mailTemplateParse = handlebars.compile(templateFileContent);
    const html = mailTemplateParse(variables);

    await this.client.sendMail({
      to,
      subject,
      html,
      from: 'Lucrando com Crédito <noreply@lucrandocomcredito.com.br',
      attachments: [
        {
          filename: 'Logo.png',
          path: resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'assets',
            'logo.png',
          ),
          cid: 'logo',
        },
      ],
    });
  }
}

export { SendMailService };
