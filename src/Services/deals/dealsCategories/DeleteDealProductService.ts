import { DealProductModel } from '../../../Modules/deal/models/DealProduct';
import { DealProduct } from '../../../Modules/deal/schemas/DealProduct';

interface Request {
  id: string;
}

class DeleteDealProductService {
  public async execute({ id }: Request): Promise<DealProduct> {
    const dealProduct = await DealProductModel.findByIdAndDelete(id);
    return dealProduct;
  }
}

export default DeleteDealProductService;
