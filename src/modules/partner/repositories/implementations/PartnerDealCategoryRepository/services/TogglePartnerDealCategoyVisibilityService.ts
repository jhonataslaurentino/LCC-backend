import AppError from '../../../../../../errors/AppError';
import { PartnerDealCategoryModel } from '../../../../models/PartnerDealCategoryModel';
import { PartnerDealCategory } from '../../../../Schemas/PartnerDealsCategories';

class TogglePartnerDealCategoyVisibilityService {
  async execute(partnerDealCategoryID: string): Promise<PartnerDealCategory> {
    const partnerDealCategory = await PartnerDealCategoryModel.findById(
      partnerDealCategoryID,
    );
    if (!partnerDealCategory) {
      throw new AppError("Partner's deal category does not exists");
    }
    partnerDealCategory.isVisible = !partnerDealCategory.isVisible;
    await partnerDealCategory.save();
    return partnerDealCategory;
  }
}

export { TogglePartnerDealCategoyVisibilityService };
