import { Field, InputType } from 'type-graphql';
import Company from '../../../Schemas/Company';

@InputType({ description: 'Get Company Info Args' })
export default class GetCompanyInfoInput implements Partial<Company> {
  @Field()
  id: string;
}
