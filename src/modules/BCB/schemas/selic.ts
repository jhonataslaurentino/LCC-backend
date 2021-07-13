import { Field, ObjectType, Float } from 'type-graphql';

@ObjectType({ description: 'The SELIC rate' })
class SELIC {
  @Field()
  date: string;

  @Field(() => Float)
  value: number;
}

export { SELIC };
