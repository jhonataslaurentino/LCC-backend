import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import { prop as Property, Ref } from '@typegoose/typegoose';
import DealType from './DealType';
import SELICRate from './SELICRate';
import Company from './Company';

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

  @Field(() => DealType)
  @Property(() => DealType)
  dealType: DealType;

  @Field(() => SELICRate)
  @Property(() => SELICRate)
  selicRate: SELICRate;

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
}

export default Simulation;
