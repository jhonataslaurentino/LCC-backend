import { IsPositive } from 'class-validator';
import { Field, Float, InputType, Int } from 'type-graphql';

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

  @Field(() => Int)
  @IsPositive()
  maxNumberOfInstallments: number;
}

export default EditDealProductInput;
