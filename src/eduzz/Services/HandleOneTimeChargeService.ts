import HandlePaidBillService from './HandlePaidBillService';
import RemoveCompanyRefundedService from './RemoveCompanyRefundedService';

interface Request {
  eduzzBillID: number;
  email: string;
  name: string;
  trans_status: number;
}

class HandleOneTimeChargeService {
  public async execute({
    eduzzBillID,
    email,
    name,
    trans_status,
  }: Request): Promise<void> {
    if (trans_status === 3) {
      const handlePaidBillService = new HandlePaidBillService();
      await handlePaidBillService.execute({
        eduzzBillID,
        email,
        name,
      });
    }
    if (trans_status === 7) {
      const removeCompanyRefundedService = new RemoveCompanyRefundedService();
      await removeCompanyRefundedService.execute({
        eduzzBillID,
      });
    }
  }
}

export default HandleOneTimeChargeService;
