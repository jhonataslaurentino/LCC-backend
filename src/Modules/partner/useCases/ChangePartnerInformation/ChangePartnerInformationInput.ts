import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Change partner information arguments' })
class ChangePartnerInformationInput {
  @Field()
  name: string;

  @Field()
  companyName: string;

  @Field()
  phone: string;

  @Field()
  password: string;
}

export { ChangePartnerInformationInput };
