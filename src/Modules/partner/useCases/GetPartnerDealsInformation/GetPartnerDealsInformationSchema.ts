import { Field, Float, Int, ObjectType } from 'type-graphql';

@ObjectType({ description: "Deal's information schema" })
class GetPartnerDealsInformationSchema {
  @Field(() => Int)
  numberOfRegisteredAssociates: number;

  @Field(() => Int)
  numberOfActiveDeals: number;

  @Field(() => Int)
  numberOfCompletedDeals: number;

  @Field(() => Float)
  completedDealsAmount: number;
}

export { GetPartnerDealsInformationSchema };
