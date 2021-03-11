import { sign } from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import CompanyModel from '../Entities/Company';
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
      from: 'plataforma@lucrandocomcredito.com.br',
      to: email,
      subject: 'Recuperar Senha',
      text: token,
    });
    if (!wasEmailSent) {
      throw new Error('Não foi possível enviar o email');
    }
    return wasEmailSent;
  }
}

export default RequestRecoverPasswordService;
