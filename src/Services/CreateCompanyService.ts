import { hash } from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import { CompanyModel } from '../modules/company/models/Company';
import Company from '../modules/company/schemas/Company';
import { getDefaultRoleForCompanyByEmailUseCase } from '../modules/company/useCases/GetDefaultRoleForCompanyByEmail';

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

export interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

interface SubData {
  eduzzBillID: number;
  timeToExpireToken: string;
  recurrence_code: number;
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
    let tokenData = {} as SubData;
    try {
      const tokenDecoded = verify(token, authConfig.jwt.secret);
      const { sub } = tokenDecoded as TokenPayload;
      tokenData = JSON.parse(sub) as SubData;
    } catch (error) {
      throw new Error(`Invalid JWT token: ${error}`);
    }

    const isThereAnyCompanyUsingThatToken = await CompanyModel.findOne({
      accessToken: token,
    });

    if (isThereAnyCompanyUsingThatToken) {
      throw new Error('Token Already used');
    }

    const isThereAnyCompanyWithSameEmail = await CompanyModel.findOne({
      email,
    }).exec();

    if (isThereAnyCompanyWithSameEmail) {
      throw new Error('This email is already used');
    }

    const hashedPassword = await hash(password, 8);

    const userRole = await getDefaultRoleForCompanyByEmailUseCase.execute(
      email,
    );

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
        eduzzBillID: tokenData.eduzzBillID || 0,
        eduzzRecurrenceCode: tokenData.recurrence_code || 0,
        isSuspended: false,
        haveLifetimeAccess: false,
      })
    ).save();
    return company;
  }
}

export default CreateCompanyService;
