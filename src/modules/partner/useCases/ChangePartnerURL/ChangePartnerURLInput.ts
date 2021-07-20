import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Change Partner URL Use Case' })
class ChangePartnerURLInput {
  @Field()
  partnerID: string;

  @Field()
  url: string;
}

export { ChangePartnerURLInput };
