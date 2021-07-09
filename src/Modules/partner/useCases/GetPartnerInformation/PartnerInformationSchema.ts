import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Partner information Schema' })
class PartnerInformationSchema {
  @Field(() => ID)
  id: string;

  @Field({ description: "Partner's name" })
  name: string;

  @Field({ description: "Partner's company name" })
  companyName: string;
}

export { PartnerInformationSchema };
