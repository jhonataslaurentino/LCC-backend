import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: "Response for request recover company's password" })
export default class RequestRecoverPasswordResponse {
  @Field()
  wasMailSent: boolean;
}
