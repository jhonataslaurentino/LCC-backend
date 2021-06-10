import { IWebhookRequest } from '../../HandleWebhookUseCase';
import { paidBillUseCase } from './useCases/PaidBill';
import { refundedBullUseCase } from './useCases/RefundedBill';

class OneTimeChargeUseCase {
  async execute({
    cus_email,
    cus_name,
    cus_taxnumber,
    trans_cod,
    trans_status,
    cus_tel,
  }: Omit<
    IWebhookRequest,
    'api_key' | 'recurrence_cod' | 'recurrence_status' | 'trans_items'
  >): Promise<void> {
    if (trans_status === 3) {
      paidBillUseCase.execute({
        cus_email,
        cus_name,
        cus_taxnumber,
        cus_tel,
        trans_cod,
      });
    }
    if (trans_status === 7) {
      refundedBullUseCase.execute({
        trans_cod,
      });
    }
  }
}
export { OneTimeChargeUseCase };
