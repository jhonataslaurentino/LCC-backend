import { sign } from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import endpointsConfig from '../config/endpoints.config';
import { CompanyModel } from '../modules/company/models/Company';
import SendEmailService from './SendEmailService';

interface Request {
  email: string;
}

class RequestRecoverPasswordService {
  public async execute({ email }: Request): Promise<boolean> {
    const company = await CompanyModel.findOne({
      email,
    }).exec();

    if (!company) {
      throw new Error('Company does not exists');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: company.id,
      expiresIn,
    });

    const sendEmailService = new SendEmailService();
    const wasEmailSent = await sendEmailService.execute({
      to: email,
      subject: 'Recuperar Senha',
      template: 'recoverPassword',
      context: {
        name: company.name,
        link: `${endpointsConfig.frontendURL}/recover-password/${token}`,
      },
    });
    if (!wasEmailSent) {
      throw new Error('Não foi possível enviar o email');
    }
    return wasEmailSent;
  }
}

export default RequestRecoverPasswordService;
