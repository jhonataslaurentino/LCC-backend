import { DealCategoryModel } from '../../../modules/deal/models/DealCategory';
import { DealProductModel } from '../../../modules/deal/models/DealProduct';
import { DealCategory } from '../../../modules/deal/schemas/DealCategory';

interface Request {
  dealCategoryID: string;
}

class DeleteDealCategoryService {
  public async execute({ dealCategoryID }: Request): Promise<DealCategory> {
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
