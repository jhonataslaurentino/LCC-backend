import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import { prop as Property, Ref } from '@typegoose/typegoose';
import DealProduct from './DealProduct';
import Company from './Company';
import DealCategory from './DealCategory';

@ObjectType({ description: 'Simulation Schema' })
class Simulation {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  @Property()
  value: number;

  @Field(() => Int)
  @Property()
  numberOfInstallments: number;

  @Field()
  @Property()
  name: string;

  @Field()
  @Property()
  cpf: string;

  @Field()
  @Property()
  email: string;

  @Field()
  @Property()
  phone: string;

  @Field(() => Float)
  @Property()
  averageRate: number;

  @Field(() => Float)
  @Property()
  competitiveRate: number;

  @Field(() => String)
  @Property({ ref: () => DealCategory })
  dealCategory: Ref<DealCategory>;

  @Field(() => String)
  @Property({ ref: () => DealProduct })
  dealProduct: Ref<DealProduct>;

  @Field(() => Float)
  @Property()
  selicRate: number;

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

  @Field(() => String, { nullable: true })
  @Property({ ref: () => Company })
  company: Ref<Company>;

  @Field(() => Int)
  @Property()
  amortizationType: number;

  @Field()
  @Property()
  personType: string;
}

export default Simulation;
