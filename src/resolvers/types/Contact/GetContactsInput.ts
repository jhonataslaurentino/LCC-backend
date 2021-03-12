import { Field, InputType, Int } from 'type-graphql';

@InputType({ description: 'Add Contact Info Args' })
class GetContactsInput {
  @Field(() => Int, { nullable: true })
  page: number;
}

export default GetContactsInput;
