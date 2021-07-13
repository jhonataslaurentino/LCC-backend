import { DealCategoryModel } from '../../../modules/deal/models/DealCategory';
import { DealCategory } from '../../../modules/deal/schemas/DealCategory';

class GetDealsCategoriesService {
  public async execute(): Promise<DealCategory[]> {
    const dealsCategories = await DealCategoryModel.find({}).exec();
    return dealsCategories;
  }
}

export default GetDealsCategoriesService;
