import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
class RecoverPartnerPasswordInput {
  @Field()
  token: string;

  @Field()
  @MinLength(8, {
    message: 'You should provide a new password with at least 8 characters',
  })
  newPassword: string;
}

export { RecoverPartnerPasswordInput };
