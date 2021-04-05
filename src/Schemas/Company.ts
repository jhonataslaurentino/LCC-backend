import { prop as Property } from '@typegoose/typegoose';
import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType({ description: 'The company schema' })
export default class Company {
  @Field(() => ID)
  id: string;

  @Field({ description: 'The company name' })
  @Property()
  name: string;

  @Field({ description: 'The person name' })
  @Property()
  personName: string;

  @Field({ description: 'The company email' })
  @Property()
  email: string;

  @Field({
    description:
      "The hashed company's password. it should not be returned at any request",
    nullable: true,
  })
  @Property()
  password: string;

  @Field(() => Int, {
    description: 'The ID returned from Bitrix platform',
    nullable: true,
  })
  @Property()
  bitrix_id: number;

  @Field()
  @Property()
  cpf_cnpj: string;

  @Field({ nullable: true })
  @Property()
  phone: string;

  @Field({ nullable: true })
  @Property()
  avatarFile: string;

  @Field({ nullable: true })
  @Property()
  avatarBitrixFileID: number;

  @Field(() => Boolean, { nullable: true })
  @Property()
  sawTutorial: boolean;
}
