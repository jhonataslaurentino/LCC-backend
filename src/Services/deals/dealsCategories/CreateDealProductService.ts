import { getBitrixDealFieldsUseCase } from '../../../Modules/Bitrix/useCases/GetBitrixDealFields';
import { DealCategoryModel } from '../../../Modules/deal/models/DealCategory';
import { DealProductModel } from '../../../Modules/deal/models/DealProduct';
import { DealProduct } from '../../../Modules/deal/schemas/DealProduct';

interface Request {
  name?: string;
  bitrix_id: string;
  averageRate: number;
  competitiveRate: number;
  dealCategoryID: string;
  maxNumberOfInstallments: number;
}

class CreateDealProductService {
  public async execute({
    name,
    bitrix_id,
    averageRate,
    competitiveRate,
    dealCategoryID,
    maxNumberOfInstallments,
  }: Request): Promise<DealProduct> {
    const isThereAnyDealProductWithSameBitrixID = await DealProductModel.findOne(
      {
        bitrix_id: Number(bitrix_id),
      },
    ).exec();
    if (isThereAnyDealProductWithSameBitrixID) {
      throw new Error('There is a Deal Type using the same bitrix id');
    }
    const dealCategory = await DealCategoryModel.findById(dealCategoryID);
    if (!dealCategory) {
      throw new Error('Deal category does not exists');
    }

    const bitrixDealFields = await getBitrixDealFieldsUseCase.execute();

    const bitrixDealFieldsFiltered = bitrixDealFields.filter(
      bitrixDealField =>
        bitrixDealField.key === dealCategory.bitrixProductsField,
    );
    if (bitrixDealFieldsFiltered.length === 0) {
      throw new Error(
        `There is not a bitrix deal field with the key ${dealCategory.bitrixProductsField}. Please contact the support to update the field at ${dealCategory.name} deal category`,
      );
    }
    const bitrixDealFieldsItemsFiltered = bitrixDealFieldsFiltered[0].items.filter(
      item => item.ID === bitrix_id,
    );
    if (bitrixDealFieldsItemsFiltered.length === 0) {
      throw new Error('There is not a deal type with this bitrix id');
    }
    const dealProduct = await DealProductModel.create({
      bitrix_id: bitrixDealFieldsItemsFiltered[0].ID,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      name: name || bitrixDealFieldsItemsFiltered[0].VALUE,
      competitiveRate,
      averageRate,
      dealCategory: dealCategory.id,
      maxNumberOfInstallments,
    });

    dealCategory.products.push(dealProduct.id);

    await dealCategory.save();
    return dealProduct;
  }
}

export default CreateDealProductService;
