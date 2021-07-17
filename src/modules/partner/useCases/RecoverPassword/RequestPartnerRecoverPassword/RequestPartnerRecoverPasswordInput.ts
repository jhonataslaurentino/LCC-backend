import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Recover partner password input arguments' })
class RequestPartnerRecoverPasswordInput {
  @Field()
  @IsEmail()
  email: string;
}

export { RequestPartnerRecoverPasswordInput };
