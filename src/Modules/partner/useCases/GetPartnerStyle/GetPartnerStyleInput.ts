import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Get partner styles arguments' })
class GetPartnerStyleInput {
  @Field({ description: 'ID of the partner master' })
  partnerID: string;
}

export { GetPartnerStyleInput };
