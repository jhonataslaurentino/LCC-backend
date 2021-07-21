import AppError from '../../../../errors/AppError';
import { ICompanyRepository } from "../../../company/repositories/ICompanyRepository";
import { IBitrixContactRepository } from "../../repositories/IBitrixContactRepository";
import { IBitrixDealRepository, ICreatePrepaymentOfReceivablesDTO } from "../../repositories/IBitrixDealRepository";
import { BitrixDeal } from '../../../Bitrix/schemas/BitrixDeal';

interface IRequest
  extends Omit<ICreatePrepaymentOfReceivablesDTO, 'contactID'>{
    email: string;
    name: string;
    phone: string;
    personType: string;
    cpf: string;
    birthday: Date;
  }

class CreatePartnerPrepaymentOfReceivablesUseCase {
  constructor(
    private companiesRepository: ICompanyRepository,
    private bitrixContactsRepository: IBitrixContactRepository,
    private bitrixDealsRepository: IBitrixDealRepository,
  ){}

  async execute({
    annualInvoice,
    associateCPF,
    associateRG,
    companyID,
    email,
    name,
    opportunityValue,
    personType,
    phone,
    proofOfAddress,
    proofOfBusinessAddress,
    socialContract,
    birthday,
    cpf,
  }: IRequest): Promise<BitrixDeal> {
  const company = await this.companiesRepository.findByID(companyID);
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
  const prepaymentOfReceivablesDeal = await this.bitrixDealsRepository.CreatePrepaymentOfReceivablesDeal(
    {
      annualInvoice,
      associateCPF,
      associateRG,
      companyID: String(company.bitrix_id),
      contactID: contact.ID,
      opportunityValue,
      proofOfAddress,
      proofOfBusinessAddress,
      socialContract,
    },
    );
    return prepaymentOfReceivablesDeal;
  }
}

  export {CreatePartnerPrepaymentOfReceivablesUseCase}

