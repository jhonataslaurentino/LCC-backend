import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Colors and images to use in the partner platform' })
class PartnerStyleSchema {
  @Field()
  primaryColor: string;

  @Field()
  secondaryColor: string;

  @Field()
  logoURL: string;
}

export { PartnerStyleSchema };
