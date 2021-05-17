import DealCategoryModel from '../../../Entities/DealCategory';
import DealCategory from '../../../Schemas/DealCategory';

class GetDealsCategoriesService {
  public async execute(): Promise<DealCategory[]> {
    const dealsCategories = await DealCategoryModel.find({}).exec();
    return dealsCategories;
  }
}

export default GetDealsCategoriesService;
