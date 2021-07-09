import { Field, Int, ObjectType } from 'type-graphql';
import Contact from '../../../../Schemas/Contact';

@ObjectType({
  description:
    'Get partner contacts response schema. If the partner have a master role, the contact will be of all associates',
})
class ListPartnerContactsSchema {
  @Field(() => [Contact], {
    description: 'The list of contacts gathered from bitrix api.',
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

export { ListPartnerContactsSchema };
