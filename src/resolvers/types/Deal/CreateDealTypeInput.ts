import { IsInt, IsPositive, Min, Max } from 'class-validator';
import { Field, Float, InputType, Int } from 'type-graphql';

@InputType({ description: 'Create Deal Type Input' })
class CreateDealTypeInput {
  @Field()
  dealCategoryID: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => Int)
  @IsPositive({
    message: 'You should type a positive value',
  })
  bitrix_id: number;

  @Field(() => Float)
  @IsPositive({
    message: 'You should type a positive value',
  })
  simulationRate: number;

  @Field(() => Int, {
    description:
      'You should provide 0 for property credit either 1 for vehicular credit',
  })
  @IsPositive({
    message: 'You should type a positive value',
  })
  @IsInt({
    message: 'You should provide an integer value',
  })
  @Min(0)
  @Max(1)
  creditType: 0 | 1;
}

export default CreateDealTypeInput;
