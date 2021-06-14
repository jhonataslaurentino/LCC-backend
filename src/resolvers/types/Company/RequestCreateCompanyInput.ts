import { IsEmail, Length } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType({ description: 'Request create company service args' })
export default class RequestCreateCompanyInput {
  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({
    nullable: true,
    description:
      'If you do not configure the time to expire token, the system will create a token to expire in 30 days',
  })
  expiresIn: string;

  @Field(() => Int)
  eduzzBillID: number;

  @Field(() => Int, { nullable: true })
  recurrence_code: number;
}
