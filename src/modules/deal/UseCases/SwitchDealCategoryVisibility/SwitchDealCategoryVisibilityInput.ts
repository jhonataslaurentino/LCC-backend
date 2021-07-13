import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Switch deal category visibility input' })
class SwitchDealCategoryVisibilityInput {
  @Field()
  dealCategoryID: string;
}

export default SwitchDealCategoryVisibilityInput;
