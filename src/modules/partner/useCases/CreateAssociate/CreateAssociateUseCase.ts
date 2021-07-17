import { resolve } from 'path';
import AppError from '../../../../errors/AppError';
import { IBitrixCompanyRepository } from '../../../Bitrix/repositories/IBitrixCompanyRepository';
import { GenerateRandomPasswordService } from '../../../company/repositories/implementations/CompanyRepository/services/GenerateRandomPasswordService';
import { IRoleRepository } from '../../../company/repositories/IRoleRepository';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { Partner } from '../../Schemas/Partner';
import endpoints from '../../../../config/endpoints.config';
import { SendPartnerMailService } from '../../Utils/SendPartnerMailService';

interface ICreateAssociate {
  name: string;
  email: string;
  cpf_cnpj: string;
  phone: string;
  partnerCreatorID: string;
  companyName: string;
}

class CreateAssociateUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private rolesRepository: IRoleRepository,
    private bitrixCompaniesRepository: IBitrixCompanyRepository,
  ) {}

  async execute({
    companyName,
    cpf_cnpj,
    email,
    name,
    partnerCreatorID,
    phone,
  }: ICreateAssociate): Promise<Partner> {
    const partnerCreator = await this.partnersRepository.findById(
      partnerCreatorID,
    );
    if (!partnerCreator) {
      throw new AppError('Partner creator does not exists', 404);
    }
    const createdBitrixCompanyID = await this.bitrixCompaniesRepository.createBitrixCompany(
      {
        cpf_cnpj,
        email,
        name,
        phone,
        UF_CRM_1625856609: partnerCreator.bitrix_id,
      },
    );
    const role = await this.rolesRepository.findByName('User');

    const generateRandomPasswordService = new GenerateRandomPasswordService();
    const partnerPassword = generateRandomPasswordService.execute({});

    const partner = await this.partnersRepository.createAssociate({
      companyName,
      bitrix_id: createdBitrixCompanyID,
      cpf_cnpj,
      email,
      name,
      partnerCreatorID,
      password: partnerPassword,
      phone,
      roleID: role.id,
    });

    const mailPath = resolve(
      '.',
      'src',
      'views',
      'emails',
      'partner',
      'SignUp.hbs',
    );
    const sendPartnerMailService = new SendPartnerMailService();
    await sendPartnerMailService.execute({
      path: mailPath,
      variables: {
        name,
        email: partner.email,
        password: partnerPassword,
        logo: `${endpoints.backendURL}/partner/platform/logo/${partnerCreator.id}`,
        primaryColor: partnerCreator.primaryColor,
        link: partnerCreator.siteURL,
      },
      subject: 'Seja bem vindo(a)!',
      to: partner.email,
      from: `${partnerCreator.companyName} <${partnerCreator.email}>`,
    });
    return partner;
  }
}

export { CreateAssociateUseCase };
