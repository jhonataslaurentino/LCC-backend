import { Field, Int, ObjectType } from 'type-graphql';
import { BitrixDeal } from '../../../Bitrix/schemas/BitrixDeal';

@ObjectType({
  description: 'Get Partner Deals Output Schema. This will return a pagination',
})
class GetPartnerDealsSchema {
  @Field(() => [BitrixDeal], {
    description: 'The list of deals',
    nullable: true,
  })
  result: BitrixDeal[];

  @Field(() => Int, { description: 'The number of deals gathered' })
  total: number;

  @Field(() => Int, {
    description:
      'If there are more deals, you can pass this value as an argument into page parameter to get the next page of deals',
    nullable: true,
  })
  next: number;
}

export { GetPartnerDealsSchema };
