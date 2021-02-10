import { getModelForClass } from '@typegoose/typegoose';
import Company from '../Schemas/Company';

const CompanyModel = getModelForClass(Company)

export default CompanyModel;
