import { DealCategoryModel } from '../../../../models/DealCategory';
import { DealCategory } from '../../../../schemas/DealCategory';

class FindDealCategoryByIDService {
  async execute(dealCategoryID: string): Promise<DealCategory> {
    const dealCategory = await DealCategoryModel.findById(dealCategoryID);
    return dealCategory;
  }
}

export { FindDealCategoryByIDService };
