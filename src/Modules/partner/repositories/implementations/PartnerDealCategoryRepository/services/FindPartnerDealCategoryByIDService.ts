import { PartnerDealCategoryModel } from '../../../../models/PartnerDealCategoryModel';
import { PartnerDealCategory } from '../../../../Schemas/PartnerDealsCategories';

class FindPartnerDealCategoryByIDService {
  async execute(
    partnerDealCategoryID: string,
  ): Promise<PartnerDealCategory | null> {
    const foundPartnerDealCategory = await PartnerDealCategoryModel.findById(
      partnerDealCategoryID,
    );
    return foundPartnerDealCategory;
  }
}

export { FindPartnerDealCategoryByIDService };
