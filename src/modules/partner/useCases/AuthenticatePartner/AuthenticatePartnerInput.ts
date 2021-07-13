import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Partner Authentication' })
class AuthenticatePartnerInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

export { AuthenticatePartnerInput };
