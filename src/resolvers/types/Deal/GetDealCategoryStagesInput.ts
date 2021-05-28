import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Input for get deal category stages' })
class GetDealCategoryStageInput {
  @Field()
  dealCategoryID: string;
}

export default GetDealCategoryStageInput;
