import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Request create company service args' })
export default class RequestCreateCompanyInput {
  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}
