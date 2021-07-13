import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Add a deal category to the partner arguments.' })
class AddPartnerDealCategoryInput {
  @Field()
  dealCategoryID: string;
}

export { AddPartnerDealCategoryInput };
