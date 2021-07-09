import { DealProductModel } from '../../../../models/DealProduct';
import { DealProduct } from '../../../../schemas/DealProduct';

class FindDealProductByIDService {
  async execute(id: string): Promise<DealProduct | null> {
    const dealProduct = await DealProductModel.findById(id);
    return dealProduct;
  }
}

export { FindDealProductByIDService };
