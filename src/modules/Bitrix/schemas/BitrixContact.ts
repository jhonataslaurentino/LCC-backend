import { Field, Int, ObjectType } from 'type-graphql';
import ContactInfo from '../../../Schemas/ContactInfo';

@ObjectType({ description: 'Contact schema' })
class BitrixContact {
  @Field(() => Int)
  ID: string;

  @Field({ nullable: true })
  NAME: string;

  @Field({ nullable: true })
  LAST_NAME: string;

  @Field(() => Int, { nullable: true })
  COMPANY_ID: number;

  @Field(() => String, { nullable: true })
  DATE_CREATE: Date;

  @Field(() => String, { nullable: true })
  DATE_MODIFY: Date;

  @Field(() => [ContactInfo], { nullable: true })
  PHONE: ContactInfo[];

  @Field(() => [ContactInfo], { nullable: true })
  EMAIL: ContactInfo[];

  @Field(() => Int, { nullable: true })
  CREATED_BY_ID: number;

  @Field({ nullable: true, description: 'Contact CNPJ' })
  UF_CRM_1607694757: string;

  @Field({ nullable: true, description: 'Contact CPF' })
  UF_CRM_1602185690: string;
}

export { BitrixContact };
