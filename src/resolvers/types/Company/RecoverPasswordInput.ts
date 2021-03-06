import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Recover Password Args' })
export default class RecoverPasswordInput {
  @Field({ description: 'Company email to recover' })
  @Length(1, 255)
  password: string;

  @Field({ description: "Token sent to company's email" })
  token: string;
}
