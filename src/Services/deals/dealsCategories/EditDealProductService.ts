import { DealProductModel } from '../../../modules/deal/models/DealProduct';
import { DealProduct } from '../../../modules/deal/schemas/DealProduct';

interface Request {
  id: string;
  name?: string;
  averageRate: number;
  competitiveRate: number;
}

class EditDealProductService {
  public async execute({
    id,
    name,
    averageRate,
    competitiveRate,
  }: Request): Promise<DealProduct> {
    const dealProduct = await DealProductModel.findById(id);
    if (!dealProduct) {
      throw new Error('Deal product does not exists');
    }
    dealProduct.averageRate = averageRate;
    dealProduct.competitiveRate = competitiveRate;
    dealProduct.name = name || dealProduct.name;
    await dealProduct.save();
    return dealProduct;
  }
}

export default EditDealProductService;
