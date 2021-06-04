import { Field, InputType, Int } from 'type-graphql';

@InputType({ description: 'Update Bitrix Deal Comments Arguments' })
class UpdateBitrixDealCommentsInput {
  @Field(() => Int)
  id: number;

  @Field()
  comment: string;
}

export { UpdateBitrixDealCommentsInput };
