import DealCategoryModel from '../../../Entities/DealCategory';
import DealCategory from '../../../Schemas/DealCategory';
import GetBitrixDealCategoryService from './GetBitrixDealCategoryService';

interface Request {
  name?: string;
  bitrix_id: number;
  isVisible?: boolean;
}

class CreateDealCategoryService {
  public async execute({
    name,
    bitrix_id,
    isVisible = true,
  }: Request): Promise<DealCategory> {
    const isThereAnyCompanyWithSameBitrixID = await DealCategoryModel.findOne({
      bitrix_id,
    }).exec();
    if (isThereAnyCompanyWithSameBitrixID) {
      throw new Error('There is a Deal Category using this bitrix ID');
    }
    const getBitrixDealCategoryService = new GetBitrixDealCategoryService();
    const bitrixDealCategory = await getBitrixDealCategoryService.execute({
      id: bitrix_id,
    });
    const dealCategory = await DealCategoryModel.create({
      name: name || bitrixDealCategory.NAME,
      bitrix_id: bitrixDealCategory.ID,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      dealsTypes: [],
      isVisible,
    });

    return dealCategory;
  }
}

export default CreateDealCategoryService;
