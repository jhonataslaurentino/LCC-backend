import { Field, InputType, Int } from 'type-graphql';

@InputType({ description: 'Get Deals Input Arguments' })
class GetDealsUpdatedInput {
  @Field(() => Int, { nullable: true })
  page: number;

  @Field()
  dealCategoryID: string;
}

export default GetDealsUpdatedInput;
