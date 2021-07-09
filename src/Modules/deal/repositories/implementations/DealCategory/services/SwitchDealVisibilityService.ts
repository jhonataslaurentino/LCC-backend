import { DealCategoryModel } from '../../../../models/DealCategory';
import { DealCategory } from '../../../../schemas/DealCategory';

class SwitchDealCategoryVisibilityService {
  public async execute(dealCategoryID: string): Promise<DealCategory> {
    const dealCategory = await DealCategoryModel.findById(dealCategoryID);
    if (!dealCategory) {
      throw new Error('Deal category not found');
    }
    dealCategory.isVisible = !dealCategory.isVisible;
    await dealCategory.save();
    return dealCategory;
  }
}

export { SwitchDealCategoryVisibilityService };
