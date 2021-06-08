import AppError from '../../../../errors/AppError';
import { ICompanyRepository } from '../../../company/repositories/ICompanyRepository';
import { IBitrixContactRepository } from '../../repositories/IBitrixContactRepository';
import {
  IBitrixDealRepository,
  ICreateVehicularDealDTO,
} from '../../repositories/IBitrixDealRepository';
import { BitrixDeal } from '../../schemas/BitrixDeal';

interface ICreateVehicularDealUseCaseDTO
  extends Omit<ICreateVehicularDealDTO, 'contactID'> {
  email: string;
  cpf?: string;
  cnpj?: string;
  phone?: string;
  birthday: Date;
  personType: string;
}

class CreateVehicularDealUseCase {
  constructor(
    private bitrixDealsRepository: IBitrixDealRepository,
    private bitrixContactsRepository: IBitrixContactRepository,
    private companiesRepository: ICompanyRepository,
  ) {}

  async execute({
    companyID,
    email,
    name,
    cpf,
    cnpj,
    phone,
    clientSituation,
    contactMonthlyIncome,
    opportunityValue,
    vehicleManufacturedDate,
    vehicleModel,
    vehicleName,
    vehicleTargetValue,
    vehicleValue,
    vehicularCreditType,
    address,
    birthday,
    personType,
  }: ICreateVehicularDealUseCaseDTO): Promise<BitrixDeal> {
    const company = await this.companiesRepository.findByID(companyID);
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }
    const contact = await this.bitrixContactsRepository.create({
      companyID: company.bitrix_id,
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
      companyID: String(company.bitrix_id),
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

export { CreateVehicularDealUseCase };
