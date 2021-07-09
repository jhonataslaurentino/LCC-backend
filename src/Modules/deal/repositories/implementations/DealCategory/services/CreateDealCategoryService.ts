import AppError from '../../../../../../errors/AppError';
import { findBitrixDealCategoryByIDUseCase } from '../../../../../Bitrix/useCases/FindBitrixDealCategoryByID';
import { getBitrixDealFieldsUseCase } from '../../../../../Bitrix/useCases/GetBitrixDealFields';
import { DealCategoryModel } from '../../../../models/DealCategory';
import { DealCategory } from '../../../../schemas/DealCategory';
import { ICreateDealCategoryData } from '../../../IDealCategoryRepository';

class CreateDealCategoryService {
  async execute({
    bitrixProductsField,
    bitrix_id,
    isInDevelopment,
    url,
    isVisible,
    name,
  }: ICreateDealCategoryData): Promise<DealCategory> {
    const dealCategoryAlreadyExists = await DealCategoryModel.findOne({
      bitrix_id,
    });
    if (dealCategoryAlreadyExists) {
      throw new AppError('There is a deal category using this bitrix id');
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
      String(bitrix_id),
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

export { CreateDealCategoryService };
