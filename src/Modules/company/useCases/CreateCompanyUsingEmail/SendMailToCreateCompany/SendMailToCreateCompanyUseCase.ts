import { sign } from 'jsonwebtoken';
import { resolve } from 'path';
import authConfig from '../../../../../config/authConfig';
import endpointsConfig from '../../../../../config/endpoints.config';
import AppError from '../../../../../errors/AppError';
import { SendMailService } from '../../../../global/SendMailService';
import { ICompanyRepository } from '../../../repositories/ICompanyRepository';

interface IRequest {
  name: string;
  email: string;
  eduzzBillID: number;
  timeToExpireToken: string;
  recurrence_code?: number;
}

class SendMailToCreateCompanyUseCase {
  constructor(private companiesRepository: ICompanyRepository) {}

  async execute({
    eduzzBillID,
    email,
    name,
    timeToExpireToken,
    recurrence_code,
  }: IRequest): Promise<boolean> {
    const companyAlreadyExists = await this.companiesRepository.findByEmail(
      email,
    );
    if (companyAlreadyExists) {
      throw new AppError('This emails is already used');
    }
    const { secret } = authConfig.jwt;
    let token = '';
    try {
      token = sign({}, secret, {
        subject: JSON.stringify({
          eduzzBillID,
          timeToExpireToken,
          recurrence_code,
        }),
        expiresIn: timeToExpireToken || '30d',
      });
    } catch (error) {
      throw new AppError('Invalid data for create token');
    }
    const mailPath = resolve('.', 'src', 'views', 'emails', 'SignUp.hbs');
    const sendMailService = new SendMailService();
    await sendMailService.execute({
      path: mailPath,
      variables: {
        name,
        email,
        link: `${endpointsConfig.frontendURL}/cadastro/${token}`,
        logo_url: 'https://api.lucrandocomcredito.com.br/LCC/logo',
        token,
      },
      subject: 'Seja bem vindo(a)!',
      to: email,
    });
    return true;
  }
}

export { SendMailToCreateCompanyUseCase };
