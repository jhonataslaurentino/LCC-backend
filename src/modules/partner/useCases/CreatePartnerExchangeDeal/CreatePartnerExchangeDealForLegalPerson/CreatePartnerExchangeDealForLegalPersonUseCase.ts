import AppError from '../../../../../errors/AppError';
import { IBitrixContactRepository } from '../../../../Bitrix/repositories/IBitrixContactRepository';
import {
  IBitrixDealRepository,
  ICreateExchangeDealForLegalPersonDTO,
} from '../../../../Bitrix/repositories/IBitrixDealRepository';
import { BitrixDeal } from '../../../../Bitrix/schemas/BitrixDeal';
import { IPartnerRepository } from '../../../repositories/IPartnerRepository';

interface IRequest
  extends Omit<ICreateExchangeDealForLegalPersonDTO, 'contactID'> {
  name: string;
  birthday: Date;
  personType: string;
}

class CreatePartnerExchangeDealForLegalPersonUseCase {
  constructor(
    private bitrixDealsRepository: IBitrixDealRepository,
    private partnersRepository: IPartnerRepository,
    private bitrixContactsRepository: IBitrixContactRepository,
  ) {}

  async execute({
    addressNumber,
    birthday,
    city,
    cnpj,
    companyAddress,
    companyID,
    complement,
    corporateName,
    district,
    email,
    fantasyName,
    mainActivity,
    name,
    opportunityValue,
    personType,
    phone,
    uf,
  }: IRequest): Promise<BitrixDeal> {
    const partner = await this.partnersRepository.findById(companyID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const contact = await this.bitrixContactsRepository.create({
      companyID: partner.bitrix_id,
      email,
      name,
      cnpj,
      birthday,
      personType,
      phone,
    });
    const createdDeal = await this.bitrixDealsRepository.CreateExchangeDealForLegalPerson(
      {
        addressNumber,
        city,
        cnpj,
        companyAddress,
        companyID: String(partner.bitrix_id),
        complement,
        contactID: contact.ID,
        corporateName,
        district,
        email,
        fantasyName,
        mainActivity,
        opportunityValue,
        phone,
        uf,
      },
    );
    return createdDeal;
  }
}

export { CreatePartnerExchangeDealForLegalPersonUseCase };
