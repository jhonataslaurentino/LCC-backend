import { IBillStatus } from '../dtos/IEduzz';
import BillStatusNotFoundError from '../errors/BillStatusNotFound';
import BillsStatus from '../Objects/BillsStatus';

interface Request {
  bill_id: number;
}

class GetBillStatusService {
  public execute({ bill_id }: Request): IBillStatus {
    const billFound = BillsStatus.find(billStatus => billStatus.id === bill_id);
    if (!billFound) {
      throw new BillStatusNotFoundError('bill id invalid');
    }
    return billFound;
  }
}

export default GetBillStatusService;
