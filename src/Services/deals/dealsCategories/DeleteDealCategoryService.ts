import DealCategoryModel from '../../../Entities/DealCategory';
import DealCategory from '../../../Schemas/DealCategory';

interface Request {
  dealCategoryID: string;
}

class DeleteDealCategoryService {
  public async execute({ dealCategoryID }: Request): Promise<DealCategory> {
    const dealCategory = await DealCategoryModel.findByIdAndDelete(
      dealCategoryID,
    );
    return dealCategory;
  }
}

export default DeleteDealCategoryService;
