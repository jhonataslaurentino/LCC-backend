import { getModelForClass } from '@typegoose/typegoose';
import { DealProduct } from '../schemas/DealProduct';

const DealProductModel = getModelForClass(DealProduct, {
  schemaOptions: { timestamps: true },
});

export { DealProductModel };
