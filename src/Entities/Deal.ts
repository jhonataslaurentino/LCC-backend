import { getModelForClass } from '@typegoose/typegoose';
import Deal from '../Schemas/BitrixDeal';

const DealModel = getModelForClass(Deal, {
  schemaOptions: { timestamps: true },
});

export default DealModel;
