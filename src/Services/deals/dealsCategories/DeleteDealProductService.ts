import DealProductModel from '../../../Entities/DealProduct';
import DealProduct from '../../../Schemas/DealProduct';

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
