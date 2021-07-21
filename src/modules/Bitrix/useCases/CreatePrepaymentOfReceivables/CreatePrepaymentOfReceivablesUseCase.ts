import { ICompanyRepository } from "../../../company/repositories/ICompanyRepository";
import { IBitrixContactRepository } from "../../repositories/IBitrixContactRepository";
import { IBitrixDealRepository, ICreatePrepaymentOfReceivablesDTO } from "../../repositories/IBitrixDealRepository";

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

  })
}
  export {CreatePartnerPrepaymentOfReceivablesUseCase}

