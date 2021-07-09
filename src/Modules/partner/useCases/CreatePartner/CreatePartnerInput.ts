import { IsEmail, Length, Validate } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { CPFORCNPJValidator } from '../../../../Validators/CPFORCNPJValidator';

@InputType({
  description:
    'Create Partner Arguments. You should be an administrator to create a partner',
})
class CreatePartnerInput {
  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  companyName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8, 255)
  password: string;

  @Field()
  @Validate(CPFORCNPJValidator, {
    message: 'You should provide a valid CPF/CNPJ',
  })
  cpf_cnpj: string;

  @Field()
  phone: string;

  @Field()
  siteURL: string;
}

export { CreatePartnerInput };
