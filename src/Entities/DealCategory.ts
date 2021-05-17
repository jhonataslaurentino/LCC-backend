import { getModelForClass } from '@typegoose/typegoose';
import DealCategory from '../Schemas/DealCategory';

const DealCategoryModel = getModelForClass(DealCategory, {
  schemaOptions: { timestamps: true },
});

export default DealCategoryModel;
