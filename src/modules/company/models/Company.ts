import { getModelForClass } from '@typegoose/typegoose';
import Company from '../schemas/Company';

const CompanyModel = getModelForClass(Company, {
  schemaOptions: { timestamps: true },
});

export { CompanyModel };
