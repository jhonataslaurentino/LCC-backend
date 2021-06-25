import { getModelForClass } from '@typegoose/typegoose';
import { Partner } from '../Schemas/Partner';

const PartnerModel = getModelForClass(Partner, {
  schemaOptions: { timestamps: true },
});

export { PartnerModel };
