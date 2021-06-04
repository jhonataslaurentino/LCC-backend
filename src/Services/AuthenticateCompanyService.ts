import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import { CompanyModel } from '../Modules/company/models/Company';
import Company from '../Modules/company/schemas/Company';

interface Request {
  email: string;
  password: string;
}

interface Response {
  company: Company;
  token: string;
}

class AuthenticateCompanyService {
  public async execute({ email, password }: Request): Promise<Response> {
    const company = await CompanyModel.findOne({
      email,
    }).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }
    const isPasswordMatched = await compare(password, company.password);
    if (!isPasswordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: company.id,
      expiresIn,
    });
    return { company, token };
  }
}

export default AuthenticateCompanyService;
