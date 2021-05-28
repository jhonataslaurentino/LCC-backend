import { sign } from 'jsonwebtoken';
import authConfig from '../../config/authConfig';
import endpointsConfig from '../../config/endpoints.config';
import CompanyModel from '../../Entities/Company';
import SendEmailService from '../../Services/SendEmailService';

interface Request {
  email: string;
  name: string;
  template: string;
  eduzzBillID?: number;
  timeToExpireToken?: string;
  recurrence_code?: number;
}

export interface SentEmailToCreateCompanyData {
  recurrence_code?: number;
  eduzzBillID?: number;
}

class SendEmailToCreateCompanyService {
  public async execute({
    email,
    name,
    template,
    eduzzBillID,
    timeToExpireToken,
    recurrence_code,
  }: Request): Promise<boolean> {
    const company = await CompanyModel.findOne({
      email,
    }).exec();

    if (company) {
      throw new Error('This email is already used');
    }

    const { secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(
        JSON.stringify({
          recurrence_code,
          eduzzBillID,
        } as SentEmailToCreateCompanyData),
      ),
      expiresIn: timeToExpireToken || '1y',
    });

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
