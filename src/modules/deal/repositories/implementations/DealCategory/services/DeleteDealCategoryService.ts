import { DealCategoryModel } from '../../../../models/DealCategory';
import { DealProductModel } from '../../../../models/DealProduct';
import { DealCategory } from '../../../../schemas/DealCategory';

class DeleteDealCategoryService {
  public async execute(dealCategoryID: string): Promise<DealCategory> {
    const dealCategory = await DealCategoryModel.findById(dealCategoryID);
    if (!dealCategory) {
      throw new Error('Deal category do not exists');
    }
    await DealProductModel.deleteMany({ _id: dealCategory.products });
    await dealCategory.deleteOne();
    return dealCategory;
  }
}

export default DeleteDealCategoryService;
