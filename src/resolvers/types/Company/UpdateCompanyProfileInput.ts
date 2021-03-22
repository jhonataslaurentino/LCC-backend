import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType({ description: 'Update Company Profile Args' })
export default class UpdateCompanyProfileInput {
  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @Length(1, 255)
  personName: string;

  @Field()
  @Length(1, 255)
  phone: string;

  @Field()
  password: string;
}
