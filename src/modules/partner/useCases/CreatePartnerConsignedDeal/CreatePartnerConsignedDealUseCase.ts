import AppError from '../../../../errors/AppError';
import { IBitrixContactRepository } from '../../../Bitrix/repositories/IBitrixContactRepository';
import {
  IBitrixDealRepository,
  ICreateConsignedDealDTO,
} from '../../../Bitrix/repositories/IBitrixDealRepository';
import { BitrixDeal } from '../../../Bitrix/schemas/BitrixDeal';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';

interface IRequest extends Omit<ICreateConsignedDealDTO, 'contactID'> {
  email: string;
  name: string;
  phone: string;
  personType: string;
  birthday: Date;
}

class CreatePartnerConsignedDealUseCase {
  constructor(
    private bitrixDealsRepository: IBitrixDealRepository,
    private partnersRepository: IPartnerRepository,
    private bitrixContactsRepository: IBitrixContactRepository,
  ) {}

  async execute({
    CNH,
    bankAccount,
    bankBranch,
    bankFinancialInstitution,
    birthday,
    companyID,
    contractedBody,
    cpf,
    email,
    name,
    opportunityValue,
    personType,
    phone,
    proofOfAddress,
  }: IRequest): Promise<BitrixDeal> {
    const partner = await this.partnersRepository.findById(companyID);
    if (!partner) {
      throw new AppError('Company does not exists', 404);
    }
    const contact = await this.bitrixContactsRepository.create({
      birthday,
      companyID: partner.bitrix_id,
      email,
      name,
      cpf,
      personType,
      phone,
    });

    const consignedDeal = await this.bitrixDealsRepository.CreateConsignedDeal({
      CNH,
      bankAccount,
      bankBranch,
      bankFinancialInstitution,
      companyID: String(partner.bitrix_id),
      contactID: contact.ID,
      contractedBody,
      cpf,
      opportunityValue,
      proofOfAddress,
    });
    return consignedDeal;
  }
}

export { CreatePartnerConsignedDealUseCase };
