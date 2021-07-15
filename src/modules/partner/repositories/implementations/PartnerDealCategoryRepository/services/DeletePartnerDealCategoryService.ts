import AppError from '../../../../../../errors/AppError';
import { PartnerDealCategoryModel } from '../../../../models/PartnerDealCategoryModel';
import { PartnerModel } from '../../../../models/PartnerModel';
import { PartnerDealCategory } from '../../../../Schemas/PartnerDealsCategories';
import { IDeletePartnerDealCategory } from '../../../IPartnerDealCategoryRepository';

class DeletePartnerDealCategoryService {
  async execute({
    partnerDealCategoryID,
    partnerID,
  }: IDeletePartnerDealCategory): Promise<PartnerDealCategory> {
    const partner = await PartnerModel.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const partnerDealCategories = partner.dealCategories as PartnerDealCategory[];
    const partnerDealCategoryIndex = partnerDealCategories.findIndex(
      partnerDealCategory => partnerDealCategory.id === partnerDealCategoryID,
    );
    if (partnerDealCategoryIndex < 0) {
      throw new AppError('Partner deal category doest not exists', 404);
    }
    delete partnerDealCategories[partnerDealCategoryIndex];
    const deletedPartnerDealCategory = await PartnerDealCategoryModel.findByIdAndDelete(
      partnerDealCategoryID,
    );
    if (!deletedPartnerDealCategory) {
      throw new AppError("Partner's deal category does not exists");
    }
    await partner.save();
    return deletedPartnerDealCategory;
  }
}

export { DeletePartnerDealCategoryService };
