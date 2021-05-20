import DealProductModel from '../../../Entities/DealProduct';
import DealProduct from '../../../Schemas/DealProduct';

class GetDealsProductsService {
  public async execute(): Promise<DealProduct[]> {
    const dealProducts = await DealProductModel.find({});
    return dealProducts;
  }
}

export default GetDealsProductsService;
