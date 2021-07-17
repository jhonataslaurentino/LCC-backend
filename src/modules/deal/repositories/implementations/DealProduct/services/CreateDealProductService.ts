import AppError from '../../../../../../errors/AppError';
import { DealCategoryModel } from '../../../../models/DealCategory';
import { DealProductModel } from '../../../../models/DealProduct';
import { DealProduct } from '../../../../schemas/DealProduct';
import { ICreateDealProductData } from '../../../IDealProductRepository';

class CreateDealProductService {
  async execute({
    averageRate,
    bitrix_id,
    competitiveRate,
    dealCategoryID,
    maxNumberOfInstallments,
    name,
  }: ICreateDealProductData): Promise<DealProduct> {
    const dealCategory = await DealCategoryModel.findById(dealCategoryID);
    if (!dealCategory) {
      throw new AppError('Deal category does not exists', 404);
    }

    const dealProduct = await DealProductModel.create({
      bitrix_id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      name,
      competitiveRate,
      averageRate,
      dealCategory: dealCategory.id,
      maxNumberOfInstallments,
    });

    dealCategory.products.push(dealProduct.id);

    await dealCategory.save();
    return dealProduct;
  }
}

export { CreateDealProductService };
