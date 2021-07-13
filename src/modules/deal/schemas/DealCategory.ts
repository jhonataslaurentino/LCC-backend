import { Field, ID, Int, ObjectType } from 'type-graphql';
import { plugin, Prop, prop as Property, Ref } from '@typegoose/typegoose';
import * as autopopulate from 'mongoose-autopopulate';
import { DealProduct } from './DealProduct';

@ObjectType({ description: 'Deal category schema' })
@plugin(autopopulate.default)
class DealCategory {
  @Field(() => ID)
  id: string;

  @Field()
  @Property()
  name: string;

  @Field(() => Int)
  @Property()
  bitrix_id: number;

  @Field(() => Boolean, { defaultValue: true })
  @Prop({ default: true })
  isVisible: boolean;

  @Field()
  @Property()
  bitrixProductsField: string;

  @Field({ description: 'Url to do a deal request', nullable: true })
  @Property()
  url: string;

  @Field(() => Boolean, {
    description: 'It describes if the deal is in development or not',
  })
  @Property()
  isInDevelopment: boolean;

  @Field(() => [DealProduct], { nullable: true })
  @Property({ autopopulate: true, ref: () => DealProduct })
  products: Ref<DealProduct>[];

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

export { DealCategory };
