import { getModelForClass } from '@typegoose/typegoose';
import DealProduct from '../Schemas/DealProduct';

const DealProductModel = getModelForClass(DealProduct, {
  schemaOptions: { timestamps: true },
});

export default DealProductModel;
