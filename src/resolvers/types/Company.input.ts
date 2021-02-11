import { IsEmail, Length } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';
import Company from '../../Schemas/Company';

@InputType({ description: 'Create Company Args' })
class CreateCompanyInput implements Partial<Company> {
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
  password: string;

  @Field(() => Number, { nullable: true })
  bitrix_id: number;

  @Field({ nullable: true })
  @Length(1, 255)
  cpf_cnpj: string;
}

@InputType({description: "Update Company's bitrix id Args"})
class UpdateBitrixIdInput implements Partial<Company> {
  @Field(() => ID)
  company_id: string;

  @Field(() => Number)
  bitrix_id: number;
}

@InputType({description: "Company's Authentication Args"})
class AuthenticationCompanyInput implements Partial<Company>{
  @Field()
  @IsEmail()
  email: string

  @Field()
  @Length(8, 255)
  password: string;
}

export {CreateCompanyInput, UpdateBitrixIdInput, AuthenticationCompanyInput};
