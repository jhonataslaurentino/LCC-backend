import { DealProductModel } from '../../../modules/deal/models/DealProduct';
import { DealProduct } from '../../../modules/deal/schemas/DealProduct';

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
