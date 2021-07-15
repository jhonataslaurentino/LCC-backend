import { IsEmail } from 'class-validator';
import { Field, Float, InputType } from 'type-graphql';

@InputType({
  description:
    'Input arguments to create a new Exchange deal for physical person',
})
class CreatePartnerExchangeDealForPhysicalPersonInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  personType: string;

  @Field()
  opportunityValue: number;

  @Field()
  name: string;

  @Field()
  cpf: string;

  @Field()
  interestComment: string;

  @Field()
  birthday: Date;

  @Field(() => Float)
  monthlyIncome: number;

  @Field()
  rg: string;

  @Field()
  rgIssueDate: Date;

  @Field()
  rgIssuingAgency: string;

  @Field()
  naturalness: string;

  @Field()
  nationality: string;

  @Field()
  gender: string;

  @Field()
  profession: string;

  @Field()
  homeAddress: string;

  @Field()
  district: string;

  @Field()
  city: string;

  @Field()
  UF: string;

  @Field()
  zipCode: string;

  @Field()
  maritalStatus: string;

  @Field()
  phone: string;

  @Field()
  cellPhone: string;

  @Field()
  doesTheCustomerHaveAnyRelevantRole: string;
}

export { CreatePartnerExchangeDealForPhysicalPersonInput };
