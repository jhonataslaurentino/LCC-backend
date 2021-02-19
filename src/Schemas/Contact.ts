import { Field, Int, ObjectType } from 'type-graphql';
import ContactInfo from './ContactInfo';

@ObjectType({ description: 'Contact schema' })
export default class Contact {
  @Field(() => Int)
  ID: string;

  @Field({ nullable: true })
  NAME: string;

  @Field({ nullable: true })
  LAST_NAME: string;

  @Field(() => Int, { nullable: true })
  COMPANY_ID: number;

  @Field({ nullable: true })
  DATE_CREATE: Date;

  @Field({ nullable: true })
  DATE_MODIFY: Date;

  @Field(() => [ContactInfo], { nullable: true })
  PHONE: ContactInfo[];

  @Field(() => [ContactInfo], { nullable: true })
  EMAIL: ContactInfo[];

  @Field(() => Int, { nullable: true })
  CREATED_BY_ID: number;
}
