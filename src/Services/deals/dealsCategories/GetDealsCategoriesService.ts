import { DealCategoryModel } from '../../../Modules/deal/models/DealCategory';
import { DealCategory } from '../../../Modules/deal/schemas/DealCategory';

class GetDealsCategoriesService {
  public async execute(): Promise<DealCategory[]> {
    const dealsCategories = await DealCategoryModel.find({}).exec();
    return dealsCategories;
  }
}

export default GetDealsCategoriesService;
