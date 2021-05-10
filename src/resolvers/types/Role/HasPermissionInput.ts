import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Verify if has permission query args' })
class HasPermissionInput {
  @Field()
  permissionName: string;
}

export default HasPermissionInput;
