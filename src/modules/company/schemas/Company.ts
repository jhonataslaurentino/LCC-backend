import { plugin, prop as Property, Ref } from '@typegoose/typegoose';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import * as autopopulate from 'mongoose-autopopulate';
import Role from './Role';
import Simulation from '../../simulation/schemas/Simulation';

@ObjectType({ description: 'The company schema' })
@plugin(autopopulate.default)
export default class Company {
  @Field(() => ID)
  id?: string;

  @Field({ description: 'The company name' })
  @Property()
  name: string;

  @Field({ description: 'The person name' })
  @Property()
  personName: string;

  @Field({ description: 'The user name', nullable: true })
  @Property()
  userName: string;

  @Field({ description: 'The company email' })
  @Property()
  email: string;

  @Field({
    description: 'Eduzz Bill ID',
    nullable: true,
    defaultValue: 0,
  })
  @Property()
  eduzzBillID: number;

  @Field({
    description: 'Eduzz recurrence code',
    nullable: true,
    defaultValue: 0,
  })
  @Property()
  eduzzRecurrenceCode: number;

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

  @Field({ nullable: true })
  @Property()
  logoBitrixFileID: number;

  @Field(() => Boolean, { nullable: true })
  @Property()
  sawTutorial: boolean;

  @Field(() => Role, { nullable: true })
  @Property({ autopopulate: true, ref: () => Role })
  roleId: Ref<Role>;

  @Field(() => Date, { nullable: true })
  @Property({ default: Date.now() })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @Property({ default: Date.now() })
  updatedAt: Date;

  @Field({
    nullable: true,
    description:
      'It should be used to provide a time access limitation for a user through a jwt token.',
  })
  @Property()
  accessToken: string;

  @Field(() => [Simulation], { nullable: true })
  @Property({ autopopulate: true, ref: () => Simulation })
  simulations: Ref<Simulation>[];

  @Field(() => Boolean, { nullable: true })
  @Property()
  isSuspended: boolean;

  @Field(() => Boolean, { nullable: true })
  @Property({ default: false })
  haveLifetimeAccess: boolean;
}
