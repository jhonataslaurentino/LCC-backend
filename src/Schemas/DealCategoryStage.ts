import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Deal Category Stage' })
class DealCategoryStage {
  @Field()
  NAME: string;

  @Field()
  STATUS_ID: string;

  @Field(() => Int)
  SORT: number;
}

export default DealCategoryStage;
