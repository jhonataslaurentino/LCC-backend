import AppError from '../../../../errors/AppError';
import { IBitrixCompanyRepository } from '../../../Bitrix/repositories/IBitrixCompanyRepository';
import { IRoleRepository } from '../../../company/repositories/IRoleRepository';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { Partner } from '../../Schemas/Partner';

interface IRequest {
  name: string;
  email: string;
  password: string;
  cpf_cnpj: string;
  phone: string;
  siteURL: string;
  companyName: string;
}

class CreatePartnerUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private rolesRepository: IRoleRepository,
    private bitrixCompaniesRepository: IBitrixCompanyRepository,
  ) {}

  async execute({
    cpf_cnpj,
    email,
    name,
    password,
    phone,
    siteURL,
    companyName,
  }: IRequest): Promise<Partner> {
    const role = await this.rolesRepository.findByName('Company');
    if (!role) {
      throw new AppError('Company role does not exists', 500);
    }
    const createdBitrixCompanyID = await this.bitrixCompaniesRepository.createBitrixCompany(
      {
        cpf_cnpj,
        email,
        name,
        phone,
      },
    );
    const partner = await this.partnersRepository.create({
      companyName,
      bitrix_id: createdBitrixCompanyID,
      cpf_cnpj,
      email,
      name,
      password,
      phone,
      roleID: role.id,
      siteURL,
    });
    return partner;
  }
}

export { CreatePartnerUseCase };
