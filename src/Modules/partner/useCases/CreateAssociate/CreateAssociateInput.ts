import { IsEmail, Length, Validate } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { CPFORCNPJValidator } from '../../../../Validators/CPFORCNPJValidator';

@InputType({
  description:
    'Create Associate Partner Arguments. You should be a partner to create an associate user',
})
class CreateAssociateInput {
  @Field()
  @Length(1, 255)
  name: string;

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
}

export { CreateAssociateInput };
