import { IsPositive } from 'class-validator';
import { Field, Float, InputType, Int } from 'type-graphql';

@InputType({ description: 'Create Deal Type Input' })
class CreateDealProductInput {
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
  averageRate: number;

  @Field(() => Float)
  @IsPositive({
    message: 'You should type a positive value',
  })
  competitiveRate: number;
}

export default CreateDealProductInput;
