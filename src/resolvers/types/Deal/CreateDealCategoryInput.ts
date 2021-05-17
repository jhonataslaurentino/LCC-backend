import { IsPositive } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType({ description: 'Create Deal Category Input' })
class CreateDealCategoryInput {
  @Field({ nullable: true })
  name: string;

  @Field(() => Int)
  @IsPositive({
    message: 'You should type a positive value',
  })
  bitrix_id: number;

  @Field(() => Boolean)
  isVisible: boolean;
}

export default CreateDealCategoryInput;
