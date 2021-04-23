import { Field, InputType, Float, Int } from 'type-graphql';
import { IsPositive } from 'class-validator';

@InputType({ description: 'Get Price Table Simulation Input' })
class SimulationInput {
  @Field(() => Float)
  @IsPositive({
    message: 'You should type a positive value',
  })
  loanAmount: number;

  @Field(() => Int)
  @IsPositive({
    message: 'You should type a positive value',
  })
  numberOfInstallments: number;

  @Field(() => Float, { description: 'A percentage value' })
  @IsPositive({
    message: 'You should type a positive value',
  })
  loanInterest: number;
}

export default SimulationInput;
