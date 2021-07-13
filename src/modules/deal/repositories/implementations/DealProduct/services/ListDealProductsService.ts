import { DealProductModel } from '../../../../models/DealProduct';
import { DealProduct } from '../../../../schemas/DealProduct';

class ListDealProductsService {
  public async execute(): Promise<DealProduct[]> {
    const dealProducts = await DealProductModel.find({});
    return dealProducts;
  }
}

export { ListDealProductsService };
