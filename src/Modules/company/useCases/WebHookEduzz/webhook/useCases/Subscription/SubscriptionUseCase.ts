import { canceledUseCase } from './Canceled';
import { overdueBillUseCase } from './OverdueBill';
import { paymentOnTimeUseCase } from './PaymentOnTime';
import { suspendedUseCase } from './Suspended';

interface IRequest {
  recurrence_cod: number;
  trans_cod: number;
  cus_taxnumber: string;
  cus_email: string;
  cus_name: string;
  cus_tel: string;
  recurrence_status: number;
}

class SubscriptionUseCase {
  async execute({
    recurrence_status,
    cus_email,
    cus_name,
    cus_taxnumber,
    cus_tel,
    recurrence_cod,
    trans_cod,
  }: IRequest): Promise<void> {
    if (recurrence_status === 1) {
      await paymentOnTimeUseCase.execute({
        cus_email,
        cus_name,
        cus_taxnumber,
        cus_tel,
        recurrence_cod,
        trans_cod,
      });
    }
    if (recurrence_status === 3) {
      await suspendedUseCase.execute(recurrence_cod);
    }
    if (recurrence_status === 4) {
      await canceledUseCase.execute(recurrence_cod);
    }
    if (recurrence_status === 7) {
      await overdueBillUseCase.execute(recurrence_cod);
    }
  }
}

export { SubscriptionUseCase };
