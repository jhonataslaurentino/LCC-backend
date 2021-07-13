import { getModelForClass } from '@typegoose/typegoose';
import { PartnerDealCategory } from '../Schemas/PartnerDealsCategories';

const PartnerDealCategoryModel = getModelForClass(PartnerDealCategory, {
  schemaOptions: { timestamps: true },
});

export { PartnerDealCategoryModel };
