import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Delete Deal Category Input' })
class DeleteDealCategoryInput {
  @Field()
  id: string;
}

export default DeleteDealCategoryInput;
