import { Field, InputType } from 'type-graphql';

@InputType({ description: "Delete a Partner's deal category arguments" })
class DeletePartnerDealCategoryInput {
  @Field({ description: "Partner's deal category id" })
  partnerDealCategoryID: string;
}

export { DeletePartnerDealCategoryInput };
