import { verify } from 'jsonwebtoken';
import authConfig from '../../../../../config/authConfig';
import { IBitrixCompanyRepository } from '../../../../Bitrix/repositories/IBitrixCompanyRepository';
import { ICompanyRepository } from '../../../repositories/ICompanyRepository';
import { IRoleRepository } from '../../../repositories/IRoleRepository';
import Company from '../../../schemas/Company';
import { getDefaultRoleForCompanyByEmailUseCase } from '../../GetDefaultRoleForCompanyByEmail';

interface IRequest {
  accessToken: string;
  cpf_cnpj: string;
  password?: string;
  email: string;
  name: string;
  personName?: string;
  phone: string;
  userName?: string;
}

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

interface ISubData {
  eduzzBillID: number;
  timeToExpireToken: string;
  recurrence_code: number;
  haveLifetimeAccess: boolean;
}

class CreateCompanyUsingEmailUseCase {
  constructor(
    private companiesRepository: ICompanyRepository,
    private bitrixCompaniesRepository: IBitrixCompanyRepository,
    private rolesRepository: IRoleRepository,
  ) {}

  async execute({
    cpf_cnpj,
    email,
    name,
    phone,
    password,
    personName,
    userName,
    accessToken,
  }: IRequest): Promise<Company> {
    let tokenData = {} as ISubData;
    try {
      const tokenDecoded = verify(accessToken, authConfig.jwt.secret);
      const { sub } = tokenDecoded as ITokenPayload;
      tokenData = JSON.parse(sub) as ISubData;
    } catch (error) {
      throw new Error(`Invalid JWT token: ${error}`);
    }
    const { eduzzBillID, recurrence_code, haveLifetimeAccess } = tokenData;
    const createdBitrixCompanyID = await this.bitrixCompaniesRepository.createBitrixCompany(
      {
        cpf_cnpj,
        email,
        name,
        phone,
      },
    );
    const role = await getDefaultRoleForCompanyByEmailUseCase.execute(email);
    const companyPassword =
      password || this.companiesRepository.generateRandomPassword({});
    const company = await this.companiesRepository.create({
      accessToken,
      bitrix_id: String(createdBitrixCompanyID),
      cpf_cnpj,
      eduzzBillID: String(eduzzBillID),
      email,
      name,
      password: companyPassword,
      personName: personName || name,
      phone,
      roleID: role.id,
      userName: userName || '',
      eduzzRecurrenceCode: recurrence_code || 0,
      haveLifetimeAccess,
    });

    return company;
  }
}

export { CreateCompanyUsingEmailUseCase };
