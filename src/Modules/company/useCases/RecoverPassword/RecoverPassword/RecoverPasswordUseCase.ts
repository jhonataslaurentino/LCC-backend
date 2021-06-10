import { verify } from 'jsonwebtoken';
import authConfig from '../../../../../config/authConfig';
import AppError from '../../../../../errors/AppError';
import { ICompanyRepository } from '../../../repositories/ICompanyRepository';
import Company from '../../../schemas/Company';

interface IRequest {
  token: string;
  password: string;
}

export interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

class RecoverPasswordUseCase {
  constructor(private companiesRepository: ICompanyRepository) {}

  async execute({ password, token }: IRequest): Promise<Company> {
    try {
      const tokenDecoded = verify(token, authConfig.jwt.secret);
      const { sub: companyID } = tokenDecoded as TokenPayload;
      const company = await this.companiesRepository.findByID(companyID);
      if (!company) {
        throw new AppError('Company does not exists', 404);
      }
      const companyModified = await this.companiesRepository.changePassword({
        id: company.id,
        newPassword: password,
      });
      return companyModified;
    } catch {
      throw new Error('Invalid JWT token');
    }
  }
}

export { RecoverPasswordUseCase };
