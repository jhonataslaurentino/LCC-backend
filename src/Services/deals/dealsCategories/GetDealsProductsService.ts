import { DealProductModel } from '../../../Modules/deal/models/DealProduct';
import { DealProduct } from '../../../Modules/deal/schemas/DealProduct';

class GetDealsProductsService {
  public async execute(): Promise<DealProduct[]> {
    const dealProducts = await DealProductModel.find({});
    return dealProducts;
  }
}

export default GetDealsProductsService;
