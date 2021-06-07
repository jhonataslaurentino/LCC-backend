import DealCategoryModel from '../../../Entities/DealCategory';
import { findBitrixDealCategoryByIDUseCase } from '../../../Modules/Bitrix/usecases/FindBitrixDealCategoryByID';
import { getBitrixDealFieldsUseCase } from '../../../Modules/Bitrix/usecases/GetBitrixDealFields';
import DealCategory from '../../../Schemas/DealCategory';

interface Request {
  name?: string;
  bitrix_id: string;
  isVisible?: boolean;
  bitrixProductsField: string;
  isInDevelopment: boolean;
  url?: string;
}

class CreateDealCategoryService {
  public async execute({
    name,
    bitrix_id,
    isVisible = true,
    bitrixProductsField,
    isInDevelopment,
    url,
  }: Request): Promise<DealCategory> {
    const isThereAnyCompanyWithSameBitrixID = await DealCategoryModel.findOne({
      bitrix_id,
    }).exec();
    if (isThereAnyCompanyWithSameBitrixID) {
      throw new Error('There is a Deal Category using this bitrix ID');
    }
    const bitrixDealFields = await getBitrixDealFieldsUseCase.execute();
    const bitrixDealFieldsFiltered = bitrixDealFields.filter(
      ({ key }) => key === bitrixProductsField,
    );
    if (bitrixDealFieldsFiltered.length === 0) {
      throw new Error(
        `There is not a field called ${bitrixProductsField} in the bitrix deal fields`,
      );
    }
    const bitrixDealCategory = await findBitrixDealCategoryByIDUseCase.execute(
      bitrix_id,
    );
    const dealCategory = await DealCategoryModel.create({
      name: name || bitrixDealCategory.NAME,
      bitrix_id: bitrixDealCategory.ID,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      products: [],
      isVisible,
      bitrixProductsField,
      isInDevelopment,
      url,
    });

    return dealCategory;
  }
}

export default CreateDealCategoryService;
