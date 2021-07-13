import { DealProductModel } from '../../../modules/deal/models/DealProduct';
import { DealProduct } from '../../../modules/deal/schemas/DealProduct';

class GetDealsProductsService {
  public async execute(): Promise<DealProduct[]> {
    const dealProducts = await DealProductModel.find({});
    return dealProducts;
  }
}

export default GetDealsProductsService;
