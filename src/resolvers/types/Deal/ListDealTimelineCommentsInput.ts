import { Field, InputType, Int } from 'type-graphql';

@InputType({ description: 'Get Deal Input Arguments' })
class ListDealTimelineCommentsInput {
  @Field(() => Int)
  id: number;
}

export default ListDealTimelineCommentsInput;
