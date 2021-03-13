import { Field, Int, ObjectType } from 'type-graphql';
import Deal from './Deal';

@ObjectType({
  description: 'The schema response for get deals service request.',
})
class GetDealsResponse {
  @Field(() => [Deal], {
    description: 'The list of Deals gathered from bitrix api.',
    nullable: true,
  })
  result: Deal[];

  @Field(() => Int, { description: 'The number of deals gathered.' })
  total: number;

  @Field(() => Int, {
    nullable: true,
    description:
      'If there are more deals, the bitrix api should return a number to get the next list of deals',
  })
  next: number;
}

export default GetDealsResponse;

console.log('hello World')
