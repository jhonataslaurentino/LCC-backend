import AppError from '../../../../../../errors/AppError';
import { DealCategoryModel } from '../../../../../deal/models/DealCategory';
import { DealCategory } from '../../../../../deal/schemas/DealCategory';
import { PartnerDealCategoryModel } from '../../../../models/PartnerDealCategoryModel';
import { PartnerModel } from '../../../../models/PartnerModel';
import { PartnerDealCategory } from '../../../../Schemas/PartnerDealsCategories';
import { IAddDealCategory } from '../../../IPartnerRepository';

class AddDealCategoryToPartnerService {
  async execute({
    dealCategoryID,
    partnerID,
  }: IAddDealCategory): Promise<PartnerDealCategory> {
    const partner = await PartnerModel.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const partnerDealCategories = partner.dealCategories as PartnerDealCategory[];
    const foundPartnerDealCategory = partnerDealCategories.find(
      partnerDealCategory => {
        const dealCategory = partnerDealCategory.dealCategory as DealCategory;
        return dealCategory.id === dealCategoryID;
      },
    );
    if (typeof foundPartnerDealCategory !== 'undefined') {
      throw new AppError("Partner's deal already added", 400);
    }
    const dealCategory = await DealCategoryModel.findById(dealCategoryID);
    if (!dealCategoryID) {
      throw new AppError('Deal category does not exists', 404);
    }

    const newPartnerDealCategory = await PartnerDealCategoryModel.create({
      dealCategory,
      isVisible: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    partner.dealCategories.push(newPartnerDealCategory);
    await partner.save();
    return newPartnerDealCategory;
  }
}

export { AddDealCategoryToPartnerService };
