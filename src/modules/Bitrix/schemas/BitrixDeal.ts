import { Field, Float, Int, ObjectType } from 'type-graphql';

@ObjectType({ description: "The company deal's schema" })
class BitrixDeal {
  @Field(() => Int)
  ID: number;

  @Field({ nullable: true })
  TITLE: string;

  @Field({ nullable: true })
  STAGE_ID: string;

  @Field({ nullable: true })
  CURRENCY_ID: string;

  @Field(() => Float, { nullable: true })
  OPPORTUNITY: number;

  @Field(() => Int, { nullable: true })
  COMPANY_ID: number;

  @Field(() => Int, { nullable: true })
  CONTACT_ID: number;

  @Field({ nullable: true })
  DATE_CREATE: string;

  @Field({ nullable: true })
  DATE_MODIFY: string;

  @Field({ nullable: true })
  COMMENTS: string;

  @Field({ nullable: true })
  ADDITIONAL_INFO: string;
}

export { BitrixDeal };
