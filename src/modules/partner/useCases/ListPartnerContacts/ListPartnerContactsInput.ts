import { Field, InputType, Int } from 'type-graphql';

@InputType({ description: 'Get contacts input' })
class ListPartnerContactsInput {
  @Field(() => Int, { nullable: true, description: 'The page to get contacts' })
  page: number;
}

export { ListPartnerContactsInput };
