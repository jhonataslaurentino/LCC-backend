import { getModelForClass } from '@typegoose/typegoose';
import Deal from '../Schemas/Deal';

const DealModel = getModelForClass(Deal);

export default DealModel;
