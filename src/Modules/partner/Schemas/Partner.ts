import { Field, ID, Int, ObjectType } from 'type-graphql';
import { plugin, prop as Property, Ref } from '@typegoose/typegoose';
import * as autopopulate from 'mongoose-autopopulate';
import Role from '../../company/schemas/Role';
import { PartnerDealCategory } from './PartnerDealsCategories';
import Simulation from '../../simulation/schemas/Simulation';

@ObjectType({ description: 'Partner Schema' })
@plugin(autopopulate.default)
class Partner {
  @Field(() => ID)
  id?: string;

  @Field({ description: 'The partner name' })
  @Property()
  name: string;

  @Field({ description: "The partner's company name" })
  @Property()
  companyName: string;

  @Field({ description: "The partner's email" })
  @Property()
  email: string;

  @Field({
    description:
      'The hashed Partner password. It should not be returned at any request',
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

  @Field()
  @Property()
  phone: string;

  @Field({ nullable: true })
  @Property()
  avatarBitrixFileID: number;

  @Field({ nullable: true })
  @Property()
  logoBitrixFileID: number;

  @Field(() => Role, { nullable: true })
  @Property({ autopopulate: true, ref: () => Role })
  roleID: Ref<Role>;

  @Field(() => Date, { nullable: true })
  @Property({ default: Date.now() })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @Property({ default: Date.now() })
  updatedAt: Date;

  @Field(() => [Simulation], { nullable: true })
  @Property({ autopopulate: true, ref: () => Simulation })
  simulations: Ref<Simulation>[];

  @Field(() => Boolean, { nullable: true })
  @Property()
  isSuspended: boolean;

  @Field({ description: 'Primary color value (hex)' })
  @Property()
  primaryColor: string;

  @Field({ description: 'Secondary color value (hex' })
  @Property()
  secondaryColor: string;

  @Field(() => String)
  @Property()
  siteURL: string;

  @Field(() => Partner, { nullable: true })
  @Property({ autopopulate: { maxDepth: 1 }, ref: () => Partner })
  createdBy: Ref<Partner>;

  @Field(() => [PartnerDealCategory], { nullable: true })
  @Property({ autopopulate: true, ref: () => PartnerDealCategory })
  dealCategories: Ref<PartnerDealCategory>[];
}

export { Partner };
