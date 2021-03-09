import { IsEmail, Length } from 'class-validator';
import { Field, Float, InputType } from 'type-graphql';

@InputType({ description: 'Add Contact Info Args' })
class AddVehicularCreditContactInput {
  @Field()
  @Length(1, 255)
  companyID: string;

  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @IsEmail()
  email: string;

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

  @Field()
  vehicularCreditType: 'Refin' | 'Aquisição';

  @Field({ nullable: true })
  address: string;

  @Field()
  clientSituation:
    | 'Assalariado'
    | 'Empresário'
    | 'Funcionário Público'
    | 'Aposentado'
    | 'Autônomo';

  @Field(() => Float)
  contactMonthlyIncome: number;

  @Field()
  vehicleName: string;

  @Field()
  vehicleManufacturedDate: string;

  @Field()
  vehicleModel: string;

  @Field(() => Float)
  vehicleValue: number;

  @Field(() => Float)
  vehicleTargetValue: number;

  @Field(() => Float, { nullable: true })
  opportunityValue: number;
}

export { AddVehicularCreditContactInput };
