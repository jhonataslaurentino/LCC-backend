import { Field, ObjectType } from 'type-graphql';
import BitrixDealFieldItem from './BitrixDealFieldItem';

@ObjectType({ description: 'Bitrix Deal Field' })
class BitrixDealField {
  @Field()
  key: string;

  @Field({ nullable: true })
  listLabel: string;

  @Field(() => [BitrixDealFieldItem], { nullable: true })
  items: BitrixDealFieldItem[];
}

export default BitrixDealField;
