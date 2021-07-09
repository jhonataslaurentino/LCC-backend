import { DealCategoryModel } from '../../../../models/DealCategory';
import { DealCategory } from '../../../../schemas/DealCategory';

class ListDealsCategoriesService {
  public async execute(): Promise<DealCategory[]> {
    const dealsCategories = await DealCategoryModel.find({});
    return dealsCategories;
  }
}

export { ListDealsCategoriesService };
