import {  prop as Property } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ description: 'The company model' })
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
      nullable: true
  })
  @Property()
  password: string;

  @Field(() => Number, {
    description: 'The ID returned from Bitrix platform',
    nullable: true,
  })
  @Property()
  bitrix_id: number;

  @Field()
  @Property()
  cpf_cnpj: string;
}
