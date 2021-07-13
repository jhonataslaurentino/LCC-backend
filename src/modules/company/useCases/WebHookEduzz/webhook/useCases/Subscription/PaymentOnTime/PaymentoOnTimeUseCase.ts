import { ICompanyRepository } from '../../../../../../repositories/ICompanyRepository';
import { createCompanyUseCase } from '../../../../../CreateCompany';

interface IRequest {
  recurrence_cod: number;
  trans_cod: number;
  cus_taxnumber: string;
  cus_email: string;
  cus_name: string;
  cus_tel: string;
}

class PaymentOnTimeUseCase {
  constructor(private companiesRepository: ICompanyRepository) {}

  async execute({
    recurrence_cod,
    trans_cod,
    cus_taxnumber,
    cus_email,
    cus_name,
    cus_tel,
  }: IRequest): Promise<void> {
    const companyAlreadyExists = await this.companiesRepository.findByEduzzRecurrenceCode(
      recurrence_cod,
    );
    if (companyAlreadyExists) {
      const updatedToken = this.companiesRepository.createCompanyToken({
        eduzzBillID: trans_cod,
        recurrence_code: recurrence_cod,
        timeToExpireToken: '31d',
      });
      this.companiesRepository.updateCompanyAccessToken({
        id: companyAlreadyExists.id,
        token: updatedToken,
      });
    } else {
      await createCompanyUseCase.execute({
        cpf_cnpj: cus_taxnumber,
        eduzzBillID: trans_cod,
        email: cus_email,
        name: cus_name,
        phone: cus_tel,
        recurrence_code: recurrence_cod,
        timeToExpireToken: '31d',
        sendMail: true,
      });
    }
  }
}

export { PaymentOnTimeUseCase };
