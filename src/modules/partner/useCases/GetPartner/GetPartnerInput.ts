import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Get a partner args' })
class GetPartnerInput {
  @Field({ description: "Partner's id" })
  partnerID: string;
}

export { GetPartnerInput };
