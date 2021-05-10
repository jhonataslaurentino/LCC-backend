import { Field, ObjectType, Float } from 'type-graphql';

@ObjectType({ description: 'The SELIC rate' })
class SELICRate {
  @Field()
  date: string;

  @Field(() => Float)
  value: number;
}

export default SELICRate;
