import DealCategoryModel from '../../../Entities/DealCategory';
import DealProductModel from '../../../Entities/DealProduct';
import DealCategory from '../../../Schemas/DealCategory';

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