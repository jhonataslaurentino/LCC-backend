import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Create Deal Category Input' })
class CreateDealCategoryInput {
  @Field({ nullable: true })
  name: string;

  @Field()
  bitrix_id: string;

  @Field(() => Boolean)
  isVisible: boolean;

  @Field()
  bitrixProductsField: string;
}

export default CreateDealCategoryInput;
