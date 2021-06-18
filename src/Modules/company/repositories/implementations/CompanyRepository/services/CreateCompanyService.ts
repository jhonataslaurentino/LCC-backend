import { hash } from 'bcryptjs';
import AppError from '../../../../../../errors/AppError';
import { CompanyModel } from '../../../../models/Company';
import Company from '../../../../schemas/Company';
import { ICreateCompanyDTO } from '../../../ICompanyRepository';

class CreateCompanyService {
  async execute({
    accessToken,
    bitrix_id,
    cpf_cnpj,
    eduzzBillID,
    eduzzRecurrenceCode,
    email,
    name,
    password,
    personName,
    phone,
    roleID,
    userName,
    haveLifetimeAccess,
  }: ICreateCompanyDTO): Promise<Company> {
    const companyAlreadyExists = await CompanyModel.findOne({
      email,
    });

    if (companyAlreadyExists) {
      throw new AppError('Company already exists', 409);
    }

    const hashedPassword = await hash(password, 8);
    const company = await CompanyModel.create({
      accessToken,
      avatarBitrixFileID: null,
      avatarFile: null,
      bitrix_id,
      cpf_cnpj,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      eduzzBillID,
      eduzzRecurrenceCode: eduzzRecurrenceCode || 0,
      email,
      isSuspended: false,
      logoBitrixFileID: null,
      name,
      password: hashedPassword,
      personName,
      phone,
      roleId: roleID,
      sawTutorial: false,
      simulations: [],
      userName,
      haveLifetimeAccess,
    });
    return company;
  }
}

export { CreateCompanyService };
