import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Request Recover Password Args' })
export default class RequestRecoverPasswordInput {
  @Field({ description: 'Company email to recover' })
  @Length(1, 255)
  email: string;
}
