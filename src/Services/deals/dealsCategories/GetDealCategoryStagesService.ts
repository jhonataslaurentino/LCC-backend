import qs from 'qs';
import bitrixApi from '../../../api/bitrix';
import DealCategoryModel from '../../../Entities/DealCategory';
import AppError from '../../../errors/AppError';
import DealCategoryStage from '../../../Schemas/DealCategoryStage';

interface Request {
  dealCategoryID: string;
}

class GetDealCategoryStagesService {
  public async execute({
    dealCategoryID,
  }: Request): Promise<DealCategoryStage[]> {
    const dealCategory = await DealCategoryModel.findById(dealCategoryID);
    if (!dealCategory) {
      throw new AppError('Deal Category not found');
    }
    const response = await bitrixApi.get('/crm.dealcategory.stage.list', {
      params: {
        id: dealCategory.bitrix_id,
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      },
    });
    const { result } = response.data;
    return result as DealCategoryStage[];
  }
}

export default GetDealCategoryStagesService;
