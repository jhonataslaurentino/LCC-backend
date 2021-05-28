import { sign } from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import endpointsConfig from '../config/endpoints.config';
import CompanyModel from '../Entities/Company';
import SendEmailService from './SendEmailService';

interface Request {
  email: string;
  name: string;
  template: string;
  expiresIn?: string;
}

class SendEmailToCreateCompanyService {
  public async execute({
    email,
    name,
    template,
    expiresIn,
  }: Request): Promise<boolean> {
    const company = await CompanyModel.findOne({
      email,
    }).exec();

    if (company) {
      throw new Error('This email is already used');
    }

    const { secret } = authConfig.jwt;
    let token = '';
    try {
      token = sign({}, secret, {
        subject: email,
        expiresIn: expiresIn || '7d',
      });
    } catch (error) {
      throw new Error('Invalid expires date');
    }

    const sendEmailService = new SendEmailService();
    const wasEmailSent = await sendEmailService.execute({
      to: email,
      subject: 'Seja bem vindo(a)!',
      template,
      context: {
        name,
        link: `${endpointsConfig.frontendURL}/cadastro/${token}`,
      },
    });
    if (!wasEmailSent) {
      throw new Error('Não foi possível enviar o email');
    }
    return wasEmailSent;
  }
}

export default SendEmailToCreateCompanyService;
