import { Field, ObjectType } from 'type-graphql';
import { Partner } from '../../Schemas/Partner';

@ObjectType({ description: 'Login Schema' })
class AuthenticatePartnerSchema {
  @Field()
  token: string;

  @Field(() => Partner)
  partner: Partner;
}

export { AuthenticatePartnerSchema };
