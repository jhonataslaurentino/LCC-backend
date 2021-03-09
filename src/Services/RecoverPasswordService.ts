import { hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import CompanyModel from '../Entities/Company';
import Company from '../Schemas/Company';

interface Request {
  token: string;
  password: string;
}

export interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

class RecoverPasswordService {
  public async execute({ token, password }: Request): Promise<Company> {
    try {
      const tokenDecoded = verify(token, authConfig.jwt.secret);
      const { sub: companyID } = tokenDecoded as TokenPayload;
      const company = await CompanyModel.findById(companyID).exec();
      if (!company) {
        throw new Error('Company does not exists');
      }
      const hashedPassword = await hash(password, 8);
      company.password = hashedPassword;
      await company.save();
      return company;
    } catch {
      throw new Error('Invalid JWT token');
    }
  }
}

export default RecoverPasswordService;
