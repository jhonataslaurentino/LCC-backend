import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import Company from '../../../Schemas/Company';

@InputType({ description: "Company's Authentication Args" })
export default class AuthenticationCompanyInput implements Partial<Company> {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8, 255)
  password: string;
}
