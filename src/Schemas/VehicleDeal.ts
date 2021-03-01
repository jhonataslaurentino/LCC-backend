import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType({ description: "The company deal's schema" })
export default class Deal {
  @Field(() => Int)
  ID: number;

  @Field({ nullable: true })
  STAGE_ID: string;

  @Field({ nullable: true })
  TITLE: string;

  @Field(() => Int, { nullable: true })
  COMPANY_ID: number;

  @Field(() => Int, { nullable: true })
  CONTACT_ID: number;

  @Field({ nullable: true })
  DATE_CREATE: string;

  @Field({ nullable: true })
  DATE_MODIFY: string;
}
