import { hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import CompanyModel from '../Entities/Company';
import Company from '../Schemas/Company';
import GetDefaultRoleService from './Roles/GetDefaultRoleService';

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
      verify(token, authConfig.jwt.secret);
    } catch (error) {
      throw new Error(`Invalid JWT token: ${error}`);
    }

    const isThereAnyCompanyUsingThatToken = await CompanyModel.findOne({
      accessToken: token,
    });

    if (isThereAnyCompanyUsingThatToken) {
      throw new Error('Invalid Token');
    }

    const isThereAnyCompanyWithSameEmail = await CompanyModel.findOne({
      email,
    }).exec();

    if (isThereAnyCompanyWithSameEmail) {
      throw new Error('This email is already used');
    }

    const hashedPassword = await hash(password, 8);

    const getDefaultRoleService = new GetDefaultRoleService();

    const userRole = await getDefaultRoleService.execute({
      companyEmail: email,
    });

    if (!userRole) {
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
        accessToken: token,
        roleId: userRole.id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        simulations: [],
        eduzzBillID: 0,
        eduzzRecurrenceCode: 0,
        isSuspended: false,
      })
    ).save();
    return company;
  }
}

export default CreateCompanyService;
