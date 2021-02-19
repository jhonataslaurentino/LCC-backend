import { Length } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType({ description: 'Add Contact Info Args' })
class GetContactsInput {
  @Field()
  @Length(1, 255)
  companyID: string;

  @Field(() => Int, { nullable: true })
  page: number;
}

export default GetContactsInput;
