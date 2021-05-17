import { getModelForClass } from '@typegoose/typegoose';
import DealType from '../Schemas/DealType';

const DealTypeModel = getModelForClass(DealType, {
  schemaOptions: { timestamps: true },
});

export default DealTypeModel;
