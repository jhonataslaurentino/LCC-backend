import { hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import CompanyModel from '../Entities/Company';
import RoleModel from '../Entities/Role';
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
  userName?: string;
}

class CreateCompanyService {
  public async execute({
    name,
    personName,
    userName,
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

    const commonUserRole = await RoleModel.findOne({
      name: 'User',
    });

    if (!commonUserRole) {
      throw new Error('User role not found');
    }

    const company = (
      await CompanyModel.create({
        name,
        userName: userName || '',
        personName,
        email,
        password: hashedPassword,
        cpf_cnpj,
        bitrix_id,
        phone: phone || '',
        avatarFile: '',
        sawTutorial: false,
        avatarBitrixFileID: null,
        logoBitrixFileID: null,
        accessToken: '',
        roleId: commonUserRole.id,
        associatedCompaniesID: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    ).save();
    return company;
  }
}

export default CreateCompanyService;
