import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Company } from '../../Entities/Company';

@InputType({ description: 'It is building yet' })
class CompaniesInput implements Partial<Company> {
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
  @Length(1, 255)
  password: string;

  @Field(() => Number, { nullable: true })
  bitrix_id: number;

  @Field({ nullable: true })
  @Length(1, 255)
  cpf_cnpj: string;
}

export default CompaniesInput;
