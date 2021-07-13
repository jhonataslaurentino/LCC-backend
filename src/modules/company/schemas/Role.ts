import { plugin, prop as Property, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType, Int } from 'type-graphql';
import * as autopopulate from 'mongoose-autopopulate';
import Company from './Company';

@ObjectType({ description: 'The user role schema' })
@plugin(autopopulate.default)
class Role {
  @Field(() => ID)
  id: string;

  @Field({ description: 'The role name' })
  @Property()
  name: string;

  @Field(() => Int, { description: 'The role permissions' })
  @Property({ default: 0 })
  permissions: number;

  @Field(() => [Company], { nullable: true })
  @Property({
    autopopulate: true,
    ref: () => Company,
    default: [],
  })
  companies: Ref<Company>[];

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
