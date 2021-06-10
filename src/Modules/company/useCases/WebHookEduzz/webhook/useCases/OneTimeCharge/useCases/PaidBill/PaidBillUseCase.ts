import { createCompanyUseCase } from '../../../../../../CreateCompany';
import { IWebhookRequest } from '../../../../HandleWebhookUseCase';

class PaidBillUseCase {
  async execute({
    cus_email,
    cus_name,
    cus_taxnumber,
    trans_cod,
    cus_tel,
  }: Omit<
    IWebhookRequest,
    | 'api_key'
    | 'recurrence_cod'
    | 'recurrence_status'
    | 'trans_items'
    | 'trans_status'
  >): Promise<void> {
    await createCompanyUseCase.execute({
      cpf_cnpj: cus_taxnumber,
      eduzzBillID: trans_cod,
      email: cus_email,
      name: cus_name,
      phone: cus_tel,
      recurrence_code: 0,
      timeToExpireToken: '365d',
      sendMail: true,
    });
  }
}

export { PaidBillUseCase };
