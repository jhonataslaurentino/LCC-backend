import AppError from '../../../../../../errors/AppError';
import { PartnerModel } from '../../../../models/PartnerModel';
import { PartnerDealCategory } from '../../../../Schemas/PartnerDealsCategories';

class FindPartnerDealCategoryByPartnerIDService {
  async execute(partnerID: string): Promise<PartnerDealCategory[]> {
    const partner = await PartnerModel.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const dealsCategories = partner.dealCategories as PartnerDealCategory[];
    return dealsCategories;
  }
}

export { FindPartnerDealCategoryByPartnerIDService };
