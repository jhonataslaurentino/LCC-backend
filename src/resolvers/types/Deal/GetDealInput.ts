import { Field, InputType, Int } from 'type-graphql';

@InputType({ description: 'Get Deal Input Arguments' })
class GetDealInput {
  @Field(() => Int)
  dealID: number;
}

export default GetDealInput;
