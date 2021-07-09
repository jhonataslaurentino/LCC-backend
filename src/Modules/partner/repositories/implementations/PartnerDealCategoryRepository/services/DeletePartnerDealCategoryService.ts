import AppError from '../../../../../../errors/AppError';
import { PartnerDealCategoryModel } from '../../../../models/PartnerDealCategoryModel';
import { PartnerDealCategory } from '../../../../Schemas/PartnerDealsCategories';

class DeletePartnerDealCategoryService {
  async execute(partnerDealCategoryID: string): Promise<PartnerDealCategory> {
    const deletedPartnerDealCategory = await PartnerDealCategoryModel.findByIdAndDelete(
      partnerDealCategoryID,
    );
    if (!deletedPartnerDealCategory) {
      throw new AppError("Partner's deal category does not exists");
    }
    return deletedPartnerDealCategory;
  }
}

export { DeletePartnerDealCategoryService };
