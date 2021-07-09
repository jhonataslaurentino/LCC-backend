import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Get partner information arguments' })
class GetPartnerInformationInput {
  @Field()
  partnerID: string;
}

export { GetPartnerInformationInput };
