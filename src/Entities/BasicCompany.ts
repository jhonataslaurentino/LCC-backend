import { getModelForClass } from '@typegoose/typegoose';
import BasicCompany from '../Schemas/BasicCompany';

const BasicCompanyModel = getModelForClass(BasicCompany, {
  schemaOptions: { timestamps: true },
});

export default BasicCompanyModel;
