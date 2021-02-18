import { Field, ID, InputType } from 'type-graphql';
import Company from '../../../Schemas/Company';

@InputType({ description: "Update Company's bitrix id Args" })
export default class UpdateBitrixIdInput implements Partial<Company> {
  @Field(() => ID)
  company_id: string;

  @Field(() => Number)
  bitrix_id: number;
}
