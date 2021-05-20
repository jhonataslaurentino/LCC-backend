import { IsPositive } from 'class-validator';
import { Field, Float, InputType } from 'type-graphql';

@InputType()
class EditDealProductInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => Float)
  @IsPositive()
  averageRate: number;

  @Field(() => Float)
  @IsPositive()
  competitiveRate: number;
}

export default EditDealProductInput;
