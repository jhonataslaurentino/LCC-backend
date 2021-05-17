import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Deal Category' })
class BitrixDealCategory {
  @Field(() => ID)
  ID: number;

  @Field()
  NAME: string;

  @Field(() => Date)
  CREATED_DATA: Date;

  @Field()
  IS_LOCKED: 'N' | 'S';

  @Field(() => Int)
  SORT: number;
}

export default BitrixDealCategory;
