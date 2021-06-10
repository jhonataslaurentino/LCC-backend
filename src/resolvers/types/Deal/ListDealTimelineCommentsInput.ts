import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Get Deal Input Arguments' })
class ListDealTimelineCommentsInput {
  @Field()
  id: number;
}

export default ListDealTimelineCommentsInput;
