import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Get Bitrix Deal Field Items Input' })
class GetBitrixDealFieldItemsInput {
  @Field()
  dealFieldKey: string;
}

export default GetBitrixDealFieldItemsInput;
