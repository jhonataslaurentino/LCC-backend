import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
class GetAdminDataResponse {
  @Field(() => Int)
  activeAccounts: number;

  @Field(() => Int)
  inactiveAccounts: number;

  @Field(() => Int)
  numberOfPlatformAccess: number;

  @Field(() => Int)
  numberOfNewBusiness: number;
}

export default GetAdminDataResponse;
