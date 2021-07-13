import { ICompanyRepository } from '../../../../../../../repositories/ICompanyRepository';
import Company from '../../../../../../../schemas/Company';

interface IRequest {
  trans_cod: number;
}

class RefundedBillUseCase {
  constructor(private companiesRepository: ICompanyRepository) {}

  async execute({ trans_cod }: IRequest): Promise<Company> {
    const company = await this.companiesRepository.findByEduzzBillID(trans_cod);
    const suspendedCompany = await this.companiesRepository.suspend(company.id);
    return suspendedCompany;
  }
}
export { RefundedBillUseCase };
