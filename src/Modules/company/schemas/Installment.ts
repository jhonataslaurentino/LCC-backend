import { Field, ObjectType, Float } from 'type-graphql';

@ObjectType({ description: 'Price Table Installment Schema' })
class Installment {
  @Field(() => Float)
  amortization: number;

  @Field(() => Float)
  amount: number;

  @Field(() => Float)
  interest: number;

  @Field(() => Float)
  installment: number;
}

export default Installment;
