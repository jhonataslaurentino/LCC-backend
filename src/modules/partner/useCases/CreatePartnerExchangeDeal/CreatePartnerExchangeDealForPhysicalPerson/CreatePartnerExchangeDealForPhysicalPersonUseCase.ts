import AppError from '../../../../../errors/AppError';
import { IBitrixContactRepository } from '../../../../Bitrix/repositories/IBitrixContactRepository';
import {
  IBitrixDealRepository,
  ICreateExchangeDealForPhysicalPersonDTO,
} from '../../../../Bitrix/repositories/IBitrixDealRepository';
import { BitrixDeal } from '../../../../Bitrix/schemas/BitrixDeal';
import { IPartnerRepository } from '../../../repositories/IPartnerRepository';

interface IRequest
  extends Omit<ICreateExchangeDealForPhysicalPersonDTO, 'contactID'> {
  email: string;
  personType: string;
}

class CreatePartnerExchangeDealForPhysicalPersonUseCase {
  constructor(
    private bitrixDealsRepository: IBitrixDealRepository,
    private partnersRepository: IPartnerRepository,
    private bitrixContactsRepository: IBitrixContactRepository,
  ) {}

  async execute({
    UF,
    birthday,
    cellPhone,
    city,
    companyID,
    cpf,
    district,
    doesTheCustomerHaveAnyRelevantRole,
    email,
    gender,
    homeAddress,
    interestComment,
    maritalStatus,
    monthlyIncome,
    name,
    nationality,
    naturalness,
    opportunityValue,
    personType,
    phone,
    profession,
    rg,
    rgIssueDate,
    rgIssuingAgency,
    zipCode,
  }: IRequest): Promise<BitrixDeal> {
    const partner = await this.partnersRepository.findById(companyID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const contact = await this.bitrixContactsRepository.create({
      companyID: partner.bitrix_id,
      email,
      name,
      cpf,
      birthday,
      personType,
      phone,
    });
    const deal = await this.bitrixDealsRepository.CreateExchangeDealForPhysicalPerson(
      {
        UF,
        birthday,
        cellPhone,
        city,
        companyID: String(partner.bitrix_id),
        contactID: contact.ID,
        cpf,
        district,
        doesTheCustomerHaveAnyRelevantRole,
        gender,
        homeAddress,
        interestComment,
        maritalStatus,
        monthlyIncome,
        name,
        nationality,
        naturalness,
        opportunityValue,
        phone,
        profession,
        rg,
        rgIssueDate,
        rgIssuingAgency,
        zipCode,
      },
    );
    return deal;
  }
}

export { CreatePartnerExchangeDealForPhysicalPersonUseCase };
