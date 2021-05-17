import DealCategoryModel from '../../../Entities/DealCategory';
import DealCategory from '../../../Schemas/DealCategory';
import DealType from '../../../Schemas/DealType';

interface Request {
  dealCategoryID: string;
  dealType: DealType;
}

class AddDealTypeToCategoryDealService {
  public async execute({
    dealCategoryID,
    dealType,
  }: Request): Promise<DealCategory> {
    const dealCategory = await DealCategoryModel.findById(dealCategoryID);
    if (!dealCategory) {
      throw new Error('Deal category does not exists');
    }
    dealCategory.dealsTypes.push(dealType);
    await dealCategory.save();
    return dealCategory;
  }
}

export default AddDealTypeToCategoryDealService;
