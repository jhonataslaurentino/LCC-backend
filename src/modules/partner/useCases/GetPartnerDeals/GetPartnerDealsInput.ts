import { Field, InputType, Int } from 'type-graphql';

@InputType({ description: 'Get Deals Input Arguments' })
class GetPartnerDealsInput {
  @Field(() => Int, { nullable: true })
  page: number;

  @Field({ nullable: true })
  dealCategoryID: string;
}
export { GetPartnerDealsInput };
