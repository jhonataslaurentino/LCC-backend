import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Toggle partner deal category schema' })
class TogglePartnerDealCategorySchema {
  @Field()
  dealCategoryID: string;

  @Field(() => Boolean)
  checked: boolean;
}

export { TogglePartnerDealCategorySchema };
