import { sign } from 'jsonwebtoken';
import { resolve } from 'path';
import authConfig from '../../../../../config/authConfig';
import endpointsConfig from '../../../../../config/endpoints.config';
import AppError from '../../../../../errors/AppError';
import { SendMailService } from '../../../../global/SendMailService';
import { ICompanyRepository } from '../../../repositories/ICompanyRepository';

class RequestRecoverPasswordUseCase {
  constructor(private companiesRepository: ICompanyRepository) {}

  async execute(email: string): Promise<void> {
    const company = await this.companiesRepository.findByEmail(email);
    if (!company) {
      throw new AppError('Company not found', 404);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: company.id,
      expiresIn,
    });
    const mailPath = resolve(
      '.',
      'src',
      'views',
      'emails',
      'recoverPassword.hbs',
    );
    const sendEmailService = new SendMailService();
    await sendEmailService.execute({
      path: mailPath,
      variables: {
        name: company.name,
        link: `${endpointsConfig.frontendURL}/recover-password/${token}`,
        logo_url: 'https://api.lucrandocomcredito.com.br/LCC/logo',
      },
      subject: 'Recuperar Senha',
      to: company.email,
    });
  }
}

export { RequestRecoverPasswordUseCase };
