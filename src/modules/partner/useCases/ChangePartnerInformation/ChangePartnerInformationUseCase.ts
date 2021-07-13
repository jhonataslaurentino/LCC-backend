import { compare } from 'bcryptjs';
import AppError from '../../../../errors/AppError';
import { IBitrixCompanyRepository } from '../../../Bitrix/repositories/IBitrixCompanyRepository';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { Partner } from '../../Schemas/Partner';

interface IChangePartnerInformationUseCaseDTO {
  name: string;
  companyName: string;
  phone: string;
  password: string;
  partnerID: string;
}

class ChangePartnerInformationUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private bitrixCompaniesRepository: IBitrixCompanyRepository,
  ) {}

  async execute({
    companyName,
    name,
    partnerID,
    password,
    phone,
  }: IChangePartnerInformationUseCaseDTO): Promise<Partner> {
    const partner = await this.partnersRepository.findById(partnerID);
    if (!partner) {
      throw new AppError('Company does not exists', 404);
    }
    const isPasswordMatched = await compare(password, partner.password);
    if (!isPasswordMatched) {
      throw new AppError('Incorrect password', 401);
    }
    partner.name = name;
    partner.companyName = companyName;
    partner.phone = phone;
    await this.bitrixCompaniesRepository.updateField({
      id: String(partner.bitrix_id),
      PHONE: [{ VALUE: partner.phone, VALUE_TYPE: 'WORK' }],
      TITLE: name,
    });
    await this.partnersRepository.save(partner);
    return partner;
  }
}

export { ChangePartnerInformationUseCase };
