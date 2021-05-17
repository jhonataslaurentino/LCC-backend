import DealCategoryModel from '../../../Entities/DealCategory';
import DealTypeModel from '../../../Entities/DealType';
import DealType from '../../../Schemas/DealType';
import GetBitrixDealsFieldsService from '../GetBitrixDealsFieldsService';

interface Request {
  name?: string;
  bitrix_id: number;
  simulationRate: number;
  creditType: 0 | 1;
  dealCategoryID: string;
}

class CreateDealTypeService {
  public async execute({
    name,
    bitrix_id,
    simulationRate,
    creditType,
    dealCategoryID,
  }: Request): Promise<DealType> {
    const isThereAnyDealTypeWithSameBitrixID = await DealTypeModel.findOne({
      bitrix_id,
    }).exec();
    if (isThereAnyDealTypeWithSameBitrixID) {
      throw new Error('There is a Deal Type using the same bitrix id');
    }
    const dealCategory = await DealCategoryModel.findById(dealCategoryID);
    if (!dealCategory) {
      throw new Error('Deal category does not exists');
    }

    const getBitrixDealsFieldsService = new GetBitrixDealsFieldsService();
    const bitrixDealsFields = await getBitrixDealsFieldsService.execute();

    const creditTypes =
      creditType === 0
        ? bitrixDealsFields.propertyCreditType
        : bitrixDealsFields.vehicularCreditType;
    const bitrixDealType = creditTypes.filter(
      bitrixCreditType => Number(bitrixCreditType.ID) === bitrix_id,
    );
    if (bitrixDealType.length === 0) {
      throw new Error('There is not a deal type with this bitrix_id');
    }
    const dealType = await DealTypeModel.create({
      bitrix_id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      name: name || bitrixDealType[0].VALUE,
      simulationRate,
      dealCategory: dealCategory.id,
    });

    dealCategory.dealsTypes.push(dealType.id);

    await dealCategory.save();
    return dealType;
  }
}

export default CreateDealTypeService;
