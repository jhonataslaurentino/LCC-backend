import { Field, ObjectType } from 'type-graphql';
import Company from '../../../schemas/Company';

@ObjectType({ description: 'Login Schema' })
class AuthenticateCompanyOutput {
  @Field()
  token: string;

  @Field(() => Company)
  company: Company;
}

export { AuthenticateCompanyOutput };
