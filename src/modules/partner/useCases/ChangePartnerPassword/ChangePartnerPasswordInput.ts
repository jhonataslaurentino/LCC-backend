import { MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Change partner password arguments' })
class ChangePartnerPasswordInput {
  @Field({ description: 'Your current password' })
  oldPassword: string;

  @Field({ description: 'The new password' })
  @MinLength(8, {
    message: 'The password should have at least 8 characters',
  })
  newPassword: string;
}

export { ChangePartnerPasswordInput };
