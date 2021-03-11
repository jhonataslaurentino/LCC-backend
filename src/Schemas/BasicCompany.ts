import { Field, ID, ObjectType } from 'type-graphql';
import { prop as Property } from '@typegoose/typegoose';

@ObjectType({ description: 'The basic company schema' })
export default class BasicCompany {
  @Field(() => ID)
  id: string;

  @Field({ description: 'The company name' })
  @Property()
  name: string;

  @Field({ description: 'The company email' })
  @Property()
  email: string;

  @Field({ nullable: true })
  @Property()
  phone: string;
}
