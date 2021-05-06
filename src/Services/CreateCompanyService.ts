import { hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import CompanyModel from '../Entities/Company';
import Company from '../Schemas/Company';
import { TokenPayload } from './RecoverPasswordService';

interface Request {
  name: string;
  personName: string;
  email: string;
  password: string;
  cpf_cnpj: string;
  bitrix_id?: number;
  phone?: string;
  token: string;
}

class CreateCompanyService {
  public async execute({
    name,
    personName,
    email,
    password,
    cpf_cnpj,
    bitrix_id,
    phone,
    token,
  }: Request): Promise<Company> {
    try {
      const tokenDecoded = verify(token, authConfig.jwt.secret);
      const { sub: emailInsideToken } = tokenDecoded as TokenPayload;
      if (emailInsideToken !== email) {
        throw new Error('Email invalid for this token');
      }
    } catch (error) {
      throw new Error(`Invalid JWT token: ${error}`);
    }

    const isThereAnyCompanyWithSameEmail = await CompanyModel.findOne({
      email,
    }).exec();

    if (isThereAnyCompanyWithSameEmail) {
      throw new Error('This email is already used');
    }

    const hashedPassword = await hash(password, 8);

    const company = (
      await CompanyModel.create({
        name,
        personName,
        email,
        password: hashedPassword,
        cpf_cnpj,
        bitrix_id,
        phone: phone || '',
        avatarFile: '',
        sawTutorial: false,
        avatarBitrixFileID: null,
        accessToken: '',
      })
    ).save();
    return company;
  }
}

export default CreateCompanyService;
