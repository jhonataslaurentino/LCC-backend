import { Field, Float, InputType, Int } from 'type-graphql';

import { IsPositive, IsInt, IsEmail, Validate } from 'class-validator';
import CPFValidator from '../../../Validators/CPFValidator';

@InputType({ description: 'Create simulation input data' })
class CreateSimulationInput {
  @Field(() => Float)
  @IsPositive({ message: 'You should provide a positive value' })
  value: number;

  @Field(() => Int)
  @IsPositive({ message: 'You should provide a positive value' })
  @IsInt({ message: 'You should provide an integer value' })
  numberOfInstallments: number;

  @Field()
  name: string;

  @Field()
  @Validate(CPFValidator, { message: 'You should provid a valid CPF' })
  cpf: string;

  @Field()
  @IsEmail({}, { message: 'You should provide a valid email' })
  email: string;

  @Field()
  phone: string;

  @Field()
  dealTypeID: string;
}

export default CreateSimulationInput;