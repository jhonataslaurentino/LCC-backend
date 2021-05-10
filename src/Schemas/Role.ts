import { prop as Property } from '@typegoose/typegoose';
import { Field, ID, ObjectType, Int } from 'type-graphql';

@ObjectType({ description: 'The user role schema' })
class Role {
  @Field(() => ID)
  id: string;

  @Field({ description: 'The role name' })
  @Property()
  name: string;

  @Field(() => Int, { description: 'The role permissions' })
  @Property({ default: 0 })
  permissions: number;

  @Field(() => Date, {
    description: 'Created date of the model',
    nullable: true,
  })
  createdAt: Date;

  @Field(() => Date, {
    description: 'Created date of the model',
    nullable: true,
  })
  updatedAt: Date;
}

export default Role;
