import { Field, ID, Int, ObjectType } from 'type-graphql';
import { prop as Property, Ref } from '@typegoose/typegoose';
import DealProduct from './DealProduct';

@ObjectType({ description: 'The deals categories' })
class DealCategory {
  @Field(() => ID)
  id: string;

  @Field()
  @Property()
  name: string;

  @Field(() => Int)
  @Property()
  bitrix_id: string;

  @Field(() => Boolean, { defaultValue: true })
  @Property({ default: true })
  isVisible: boolean;

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

  @Field(() => [String], { nullable: true })
  @Property({ ref: () => DealProduct, default: [] })
  products: Ref<DealProduct>[];

  @Field()
  @Property()
  bitrixProductsField: string;
}

export default DealCategory;
