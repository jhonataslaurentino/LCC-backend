import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import Company from '../../../Schemas/Company';

@InputType({ description: 'Create Company Args' })
export default class CreateCompanyInput implements Partial<Company> {
  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @Length(1, 255)
  personName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8, 255)
  phone: string;

  @Field()
  @Length(8, 255)
  password: string;

  @Field(() => Number, { nullable: true })
  bitrix_id: number;

  @Field({ nullable: true })
  @Length(1, 255)
  cpf_cnpj: string;

  @Field()
  token: string;
}
