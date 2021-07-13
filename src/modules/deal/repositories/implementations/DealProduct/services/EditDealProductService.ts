import AppError from '../../../../../../errors/AppError';
import { DealProductModel } from '../../../../models/DealProduct';
import { DealProduct } from '../../../../schemas/DealProduct';
import { IEditDealProductDTO } from '../../../IDealProductRepository';

class EditDealProductService {
  async execute({
    id,
    ...properties
  }: IEditDealProductDTO): Promise<DealProduct> {
    const dealProduct = await DealProductModel.findById(id);
    if (!dealProduct) {
      throw new AppError('Deal Product does not exists', 404);
    }
    Object.assign(dealProduct, properties);
    await dealProduct.save();
    return dealProduct;
  }
}

export { EditDealProductService };
