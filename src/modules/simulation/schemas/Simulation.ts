import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import { plugin, prop as Property, Ref } from '@typegoose/typegoose';
import * as autopopulate from 'mongoose-autopopulate';
import { DealCategory } from '../../deal/schemas/DealCategory';
import { DealProduct } from '../../deal/schemas/DealProduct';

@ObjectType({ description: 'Simulation Schema' })
@plugin(autopopulate.default)
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
  cpf_cnpj: string;

  @Field()
  @Property()
  email: string;

  @Field()
  @Property()
  phone: string;

  @Field()
  @Property()
  birthday: Date;

  @Field(() => Float)
  @Property()
  averageRate: number;

  @Field(() => Float)
  @Property()
  competitiveRate: number;

  @Field(() => DealCategory)
  @Property({ autopopulate: true, ref: () => DealCategory })
  dealCategory: Ref<DealCategory>;

  @Field(() => DealProduct, { nullable: true })
  @Property({ autopopulate: true, ref: () => DealProduct, default: '' })
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

  @Field()
  @Property()
  company: string;

  @Field(() => Int)
  @Property()
  amortizationType: number;

  @Field()
  @Property()
  personType: string;
}

export default Simulation;
