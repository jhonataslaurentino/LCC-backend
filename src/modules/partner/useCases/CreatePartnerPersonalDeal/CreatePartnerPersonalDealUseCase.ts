import AppError from '../../../../errors/AppError';
import { IBitrixContactRepository } from '../../../Bitrix/repositories/IBitrixContactRepository';
import {
  IBitrixDealRepository,
  ICreatePersonalDealDTO,
} from '../../../Bitrix/repositories/IBitrixDealRepository';
import { BitrixDeal } from '../../../Bitrix/schemas/BitrixDeal';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';

interface IRequest extends Omit<ICreatePersonalDealDTO, 'contactID'> {
  email: string;
  name: string;
  phone: string;
  personType: string;
}

class CreatePartnerPersonalDealUseCase {
  constructor(
    private bitrixDealsRepository: IBitrixDealRepository,
    private partnersRepository: IPartnerRepository,
    private bitrixContactsRepository: IBitrixContactRepository,
  ) {}

  async execute({
    CNH,
    birthday,
    companyID,
    cpf,
    opportunityValue,
    proofOfAddress,
    typeOfContract,
    email,
    name,
    phone,
    personType,
  }: IRequest): Promise<BitrixDeal> {
    const company = await this.partnersRepository.findById(companyID);
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }
    const contact = await this.bitrixContactsRepository.create({
      birthday,
      companyID: company.bitrix_id,
      email,
      name,
      cpf,
      personType,
      phone,
    });
    const personalDeal = await this.bitrixDealsRepository.CreatePersonalDeal({
      CNH,
      birthday,
      companyID: String(company.bitrix_id),
      contactID: contact.ID,
      cpf,
      opportunityValue,
      proofOfAddress,
      typeOfContract,
    });
    return personalDeal;
  }
}

export { CreatePartnerPersonalDealUseCase };
