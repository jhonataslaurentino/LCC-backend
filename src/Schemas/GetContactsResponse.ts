import { Field, Int, ObjectType } from 'type-graphql';
import Contact from './Contact';

@ObjectType({
  description: 'The schema response for get deals service request.',
})
class GetContactsResponse {
  @Field(() => [Contact], {
    description: 'The list of Deals gathered from bitrix api.',
    nullable: true,
  })
  result: Contact[];

  @Field(() => Int, {
    description: 'The number of deals gathered.',
    nullable: true,
  })
  total: number;

  @Field(() => Int, {
    nullable: true,
    description:
      'If there are more deals, the bitrix api should return a number to get the next list of deals',
  })
  next: number;
}

export default GetContactsResponse;
