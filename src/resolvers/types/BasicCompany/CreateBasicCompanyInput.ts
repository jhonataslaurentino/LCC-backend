import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import Company from '../../../Schemas/Company';

@InputType({ description: 'Create Basic Company Args' })
export default class CreateBasicCompanyInput implements Partial<Company> {
  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8, 255)
  phone: string;
}
