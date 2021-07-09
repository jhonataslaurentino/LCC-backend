import { DealProductModel } from '../../../../models/DealProduct';
import { DealProduct } from '../../../../schemas/DealProduct';

class DeleteDealProductService {
  public async execute(dealProductID: string): Promise<DealProduct> {
    const dealProduct = await DealProductModel.findByIdAndDelete(dealProductID);
    return dealProduct;
  }
}

export default DeleteDealProductService;
