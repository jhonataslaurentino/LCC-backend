import { Field, InputType, Int } from 'type-graphql';

@InputType({ description: 'Get Deal Input Arguments' })
class GetDealsInput {
  @Field(() => Int, { nullable: true })
  page: number;
}

export default GetDealsInput;
