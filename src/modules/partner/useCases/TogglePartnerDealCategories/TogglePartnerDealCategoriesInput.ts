import { Field, InputType } from 'type-graphql';
import { TogglePartnerDealCategorySchema } from './TogglePartnerDealCategorySchema';

@InputType({ description: 'Toggle partner deal categories mutation arguments' })
class TogglePartnerDealCategoriesInput {
  @Field(() => [TogglePartnerDealCategorySchema])
  togglePartnerDealCategorySchemas: TogglePartnerDealCategorySchema[];
}

export { TogglePartnerDealCategoriesInput };
