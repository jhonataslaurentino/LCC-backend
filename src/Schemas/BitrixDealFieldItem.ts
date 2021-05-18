import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Bitrix Deal Field Item' })
class BitrixDealFieldItem {
  @Field(() => ID)
  ID: number;

  @Field()
  VALUE: string;
}

export default BitrixDealFieldItem;
