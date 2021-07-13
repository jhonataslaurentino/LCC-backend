import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../../config/authConfig';
import AppError from '../../../../errors/AppError';
import { verifyIfTokenIsExpired } from '../../../../utils/verifyIfTokenIsExpired';
import { ICompanyRepository } from '../../repositories/ICompanyRepository';
import Company from '../../schemas/Company';

interface IRequest {
  email: string;
  password: string;
}

interface Response {
  company: Company;
  token: string;
}

class AuthenticateCompanyUseCase {
  constructor(private companiesRepository: ICompanyRepository) {}

  async execute({ email, password }: IRequest): Promise<Response> {
    const company = await this.companiesRepository.findByEmail(email);
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }

    if (company.isSuspended) {
      throw new AppError('Company suspended', 401);
    }

    const isPasswordMatched = await compare(password, company.password);
    if (!isPasswordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    if (!company.haveLifetimeAccess) {
      if (company.accessToken) {
        const isTokenExpired = verifyIfTokenIsExpired(company.accessToken);
        if (isTokenExpired) {
          throw new AppError(
            'Your access token was expired, please contact our support',
            401,
          );
        }
      }
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: company.id,
      expiresIn,
    });
    return { company, token };
  }
}

export { AuthenticateCompanyUseCase };
