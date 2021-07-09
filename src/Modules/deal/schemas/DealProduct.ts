import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import { plugin, prop as Property, Ref } from '@typegoose/typegoose';
import * as autopopulate from 'mongoose-autopopulate';
import { DealCategory } from './DealCategory';

@ObjectType({ description: 'Deal product schema' })
@plugin(autopopulate.default)
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

  @Field(() => Int, { defaultValue: 420 })
  @Property({ default: 420 })
  maxNumberOfInstallments: number;

  @Field(() => DealCategory)
  @Property({ autopopulate: true, ref: () => DealCategory })
  dealCategory: Ref<DealCategory>;

  @Field(() => Date, {
    description: 'Created date of the model',
    nullable: true,
    defaultValue: Date.now(),
  })
  @Property({ default: Date.now() })
  createdAt: Date;

  @Field(() => Date, {
    description: 'Created date of the model',
    nullable: true,
    defaultValue: Date.now(),
  })
  @Property({ default: Date.now() })
  updatedAt: Date;
}

export { DealProduct };
