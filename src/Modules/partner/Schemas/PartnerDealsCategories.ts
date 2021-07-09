import { plugin, prop as Property, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import * as autopopulate from 'mongoose-autopopulate';
import { DealCategory } from '../../deal/schemas/DealCategory';

@ObjectType({ description: 'Partner deals categories' })
@plugin(autopopulate.default)
class PartnerDealCategory {
  @Field(() => ID)
  id: string;

  @Field(() => DealCategory)
  @Property({ autopopulate: true, ref: () => DealCategory })
  dealCategory: Ref<DealCategory>;

  @Field(() => Boolean)
  @Property()
  isVisible: boolean;

  @Field(() => Date)
  @Property({ default: Date.now() })
  createdAt: Date;

  @Field(() => Date)
  @Property({ default: Date.now() })
  updatedAt: Date;
}

export { PartnerDealCategory };
