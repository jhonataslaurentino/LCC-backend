import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'C' })
class CreatePartnerExchangeDealForLegalPersonInput {
  @Field()
  name: string;

  @Field()
  birthday: Date;

  @Field()
  personType: string;

  @Field()
  addressNumber: string;

  @Field()
  complement: string;

  @Field()
  district: string;

  @Field()
  opportunityValue: number;

  @Field()
  corporateName: string;

  @Field()
  fantasyName: string;

  @Field()
  companyAddress: string;

  @Field()
  phone: string;

  @Field()
  mainActivity: string;

  @Field()
  cnpj: string;

  @Field()
  city: string;

  @Field()
  uf: string;

  @Field()
  @IsEmail()
  email: string;
}

export { CreatePartnerExchangeDealForLegalPersonInput };
