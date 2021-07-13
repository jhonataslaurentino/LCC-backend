import { Field, InputType, Int } from 'type-graphql';

@InputType({ description: 'Get contact arguments' })
class GetCompanyContactInput {
  @Field(() => Int)
  contactID: number;
}

export { GetCompanyContactInput };
