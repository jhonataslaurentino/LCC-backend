import AppError from '../../../../errors/AppError';
import { IBitrixContactRepository } from '../../../Bitrix/repositories/IBitrixContactRepository';
import {
  IBitrixDealRepository,
  ICreateVehicularDealDTO,
} from '../../../Bitrix/repositories/IBitrixDealRepository';
import { BitrixDeal } from '../../../Bitrix/schemas/BitrixDeal';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';

interface ICreatePartnerVehicularDealUseCaseDTO
  extends Omit<ICreateVehicularDealDTO, 'contactID'> {
  email: string;
  cpf?: string;
  cnpj?: string;
  phone: string;
  birthday: Date;
  personType: string;
}

class CreatePartnerVehicularDealUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private bitrixContactsRepository: IBitrixContactRepository,
    private bitrixDealsRepository: IBitrixDealRepository,
  ) {}

  async execute({
    address,
    birthday,
    clientSituation,
    companyID,
    contactMonthlyIncome,
    email,
    name,
    opportunityValue,
    personType,
    phone,
    vehicleManufacturedDate,
    vehicleModel,
    vehicleName,
    vehicleTargetValue,
    vehicleValue,
    vehicularCreditType,
    cnpj,
    cpf,
  }: ICreatePartnerVehicularDealUseCaseDTO): Promise<BitrixDeal> {
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
      phone,
      birthday,
      personType,
    });
    const deal = await this.bitrixDealsRepository.CreateVehicularDeal({
      clientSituation,
      companyID: String(partner.bitrix_id),
      contactID: contact.ID,
      contactMonthlyIncome,
      name,
      opportunityValue,
      vehicleManufacturedDate,
      vehicleModel,
      vehicleName,
      vehicleTargetValue,
      vehicleValue,
      vehicularCreditType,
      address,
    });
    return deal;
  }
}

export { CreatePartnerVehicularDealUseCase };
