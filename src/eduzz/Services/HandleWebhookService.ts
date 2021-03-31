import GetBillStatusService from './GetBillStatusService';
import HandleBillApprovedService from './HandleBillApprovedService';

interface Request {
  customer_name: string;
  customer_email: string;
  bill_id: number;
}

class HandleWebhookService {
  public async execute({
    customer_email,
    customer_name,
    bill_id,
  }: Request): Promise<void> {
    const getBillStatusService = new GetBillStatusService();
    const billStatus = getBillStatusService.execute({ bill_id });
    if (billStatus.id === 3) {
      const handleBillApprovedService = new HandleBillApprovedService();
      await handleBillApprovedService.execute({
        customer_name,
        customer_email,
      });
    }
  }
}

export default HandleWebhookService;
