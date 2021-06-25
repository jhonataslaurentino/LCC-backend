import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({
  description:
    'Change company email arguments. You should be an administrator to change a company email',
})
class ChangeCompanyEmailInput {
  @Field()
  companyID: string;

  @Field()
  @IsEmail({}, { message: 'You should provide a valid email.' })
  newEmail: string;
}

export { ChangeCompanyEmailInput };
