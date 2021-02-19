import { Field, InputType, Int } from 'type-graphql';

@InputType({ description: 'Get Deal Input Arguments' })
class GetDealsInput {
  @Field()
  companyID: string;

  @Field(() => Int, { nullable: true })
  page: number;
  // @Field(() => Int)
  // companyID: number;

  // @Field(() => Int)
  // contactID: number;

  // @Field(() => Number, { nullable: true })
  // opportunity: number;

  // @Field(() => Int, { nullable: true })
  // stageID: number;

  // @Field(() => Date, { nullable: true })
  // updatedAt: Date;
}

export default GetDealsInput;
