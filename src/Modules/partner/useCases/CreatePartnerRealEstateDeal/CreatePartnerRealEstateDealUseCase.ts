import AppError from '../../../../errors/AppError';
import { IBitrixContactRepository } from '../../../Bitrix/repositories/IBitrixContactRepository';
import {
  IBitrixDealRepository,
  ICreateRealEstateDealDTO,
} from '../../../Bitrix/repositories/IBitrixDealRepository';
import { BitrixDeal } from '../../../Bitrix/schemas/BitrixDeal';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';

interface ICreatePartnerRealEstateUseCaseDTO
  extends Omit<ICreateRealEstateDealDTO, 'contactID'> {
  birthday: Date;
  cpf?: string;
  cnpj?: string;
}

class CreatePartnerRealEstateDealUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private bitrixContactsRepository: IBitrixContactRepository,
    private bitrixDealsRepository: IBitrixDealRepository,
  ) {}

  async execute({
    address,
    birthday,
    companyID,
    creditType,
    email,
    name,
    opportunityValue,
    personType,
    phone,
    propertyID,
    propertyValue,
    term,
    cnpj,
    cpf,
  }: ICreatePartnerRealEstateUseCaseDTO): Promise<BitrixDeal> {
    const partner = await this.partnersRepository.findById(companyID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const contact = await this.bitrixContactsRepository.create({
      companyID: partner.bitrix_id,
      email,
      name,
      cpf,
      cnpj,
      birthday,
      personType,
      phone,
    });

    const deal = await this.bitrixDealsRepository.CreateRealEstateDeal({
      address,
      companyID: String(partner.bitrix_id),
      contactID: contact.ID,
      creditType,
      email,
      name,
      opportunityValue,
      personType,
      phone,
      propertyID,
      propertyValue,
      term,
    });
    return deal;
  }
}

export { CreatePartnerRealEstateDealUseCase };
