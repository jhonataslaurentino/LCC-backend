import { Field, InputType, Int } from 'type-graphql';

@InputType({ description: 'Create Deal Category Input' })
class CreateDealCategoryInput {
  @Field({ nullable: true })
  name: string;

  @Field(() => Int)
  bitrix_id: number;

  @Field(() => Boolean)
  isVisible: boolean;

  @Field({ nullable: true })
  bitrixProductsField: string;

  @Field({ nullable: true })
  url: string;

  @Field(() => Boolean)
  isInDevelopment: boolean;
}

export default CreateDealCategoryInput;
