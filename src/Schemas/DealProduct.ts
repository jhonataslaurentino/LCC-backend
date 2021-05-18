import { Field, ObjectType, Int, Float, ID } from 'type-graphql';
import { prop as Property, Ref } from '@typegoose/typegoose';
import DealCategory from './DealCategory';

@ObjectType()
class DealProduct {
  @Field(() => ID)
  id: string;

  @Field()
  @Property()
  name: string;

  @Field(() => Int)
  @Property()
  bitrix_id: number;

  @Field(() => Float, { defaultValue: 0 })
  @Property()
  averageRate: number;

  @Field(() => Float, { defaultValue: 0 })
  @Property()
  competitiveRate: number;

  @Field(() => Date, {
    description: 'Created date of the model',
    nullable: true,
    defaultValue: Date.now(),
  })
  @Property({ default: Date.now() })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  @Property({ ref: () => DealCategory })
  dealCategory: Ref<DealCategory>;

  @Field(() => Date, {
    description: 'Created date of the model',
    nullable: true,
    defaultValue: Date.now(),
  })
  @Property({ default: Date.now() })
  updatedAt: Date;
}

export default DealProduct;
