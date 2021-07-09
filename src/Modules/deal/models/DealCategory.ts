import { getModelForClass } from '@typegoose/typegoose';
import { DealCategory } from '../schemas/DealCategory';

const DealCategoryModel = getModelForClass(DealCategory, {
  schemaOptions: { timestamps: true },
});

export { DealCategoryModel };
