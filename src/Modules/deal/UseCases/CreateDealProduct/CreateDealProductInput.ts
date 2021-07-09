import { IsPositive } from 'class-validator';
import { Field, Float, InputType, Int } from 'type-graphql';

@InputType({ description: 'Create Deal Type Input' })
class CreateDealProductInput {
  @Field()
  dealCategoryID: string;

  @Field({ nullable: true })
  name: string;

  @Field()
  bitrix_id: string;

  @Field(() => Float)
  @IsPositive({
    message: 'You should type a positive value',
  })
  averageRate: number;

  @Field(() => Float)
  @IsPositive({
    message: 'You should type a positive value',
  })
  competitiveRate: number;

  @Field(() => Int)
  @IsPositive({
    message: 'You should type the max number of installments',
  })
  maxNumberOfInstallments: number;
}

export default CreateDealProductInput;
