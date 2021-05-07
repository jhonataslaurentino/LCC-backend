import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Change company role arguments' })
class ChangeCompanyRoleInput {
  @Field()
  roleID: string;
}

export default ChangeCompanyRoleInput;
