import { Field, InputType } from 'type-graphql';

@InputType()
class DeleteDealProductInput {
  @Field()
  id: string;
}

export default DeleteDealProductInput;
