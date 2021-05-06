import { getModelForClass } from '@typegoose/typegoose';
import Company from '../Schemas/Company';

const CompanyModel = getModelForClass(Company, {
  schemaOptions: { timestamps: true },
});

export default CompanyModel;
