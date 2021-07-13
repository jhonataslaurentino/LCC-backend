import { IsEmail, Length } from 'class-validator';
import { Field, Float, InputType, Int } from 'type-graphql';

@InputType({ description: 'Add real estate to partner arguments' })
class CreatePartnerRealEstateDealInput {
  @Field()
  @Length(1, 255)
  companyID: string;

  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(1, 255)
  personType: string;

  @Field({ nullable: true })
  @Length(1, 255)
  cpf: string;

  @Field({ nullable: true })
  @Length(1, 255)
  cnpj: string;

  @Field({ nullable: true })
  @Length(1, 255)
  phone: string;

  @Field(() => Date)
  birthday: Date;

  @Field({ nullable: true })
  @Length(1, 255)
  creditType: string;

  @Field({ nullable: true })
  address: string;

  @Field(() => Float, { nullable: true })
  propertyValue: number;

  @Field(() => Float, { nullable: true })
  opportunityValue: number;

  @Field(() => Int, { nullable: true })
  term: number;

  @Field({ nullable: true })
  @Length(1, 255)
  propertyID: string;
}

export { CreatePartnerRealEstateDealInput };
