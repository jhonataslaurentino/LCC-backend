import DealCategoryModel from '../../../Entities/DealCategory';
import DealCategory from '../../../Schemas/DealCategory';
import GetBitrixDealCategoryService from './GetBitrixDealCategoryService';
import GetBitrixDealFieldsService from './GetBitrixDealFieldsService';

interface Request {
  name?: string;
  bitrix_id: string;
  isVisible?: boolean;
  bitrixProductsField: string;
}

class CreateDealCategoryService {
  public async execute({
    name,
    bitrix_id,
    isVisible = true,
    bitrixProductsField,
  }: Request): Promise<DealCategory> {
    const isThereAnyCompanyWithSameBitrixID = await DealCategoryModel.findOne({
      bitrix_id,
    }).exec();
    if (isThereAnyCompanyWithSameBitrixID) {
      throw new Error('There is a Deal Category using this bitrix ID');
    }
    const getBitrixDealFieldsService = new GetBitrixDealFieldsService();
    const bitrixDealFields = await getBitrixDealFieldsService.execute();
    const bitrixDealFieldsFiltered = bitrixDealFields.filter(
      ({ key }) => key === bitrixProductsField,
    );
    if (bitrixDealFieldsFiltered.length === 0) {
      throw new Error(
        `There is not a field called ${bitrixProductsField} in the bitrix deal fields`,
      );
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
      products: [],
      isVisible,
      bitrixProductsField,
    });

    return dealCategory;
  }
}

export default CreateDealCategoryService;
