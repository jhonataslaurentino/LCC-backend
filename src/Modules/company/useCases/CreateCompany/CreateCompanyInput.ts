import { IsEmail, Length } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import Company from '../../schemas/Company';

@InputType({ description: 'Create Company Args' })
class CreateCompanyInputType implements Partial<Company> {
  @Field()
  @Length(1, 255)
  name: string;

  @Field(() => Int)
  eduzzBillID: number;

  @Field(() => Int)
  recurrence_code: number;

  @Field()
  timeToExpireToken: string;

  @Field()
  @Length(1, 255)
  personName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8, 255)
  phone: string;

  @Field({ nullable: true })
  @Length(1, 255)
  cpf_cnpj: string;
}

export { CreateCompanyInputType };
