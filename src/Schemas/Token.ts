import { Field, ObjectType } from "type-graphql";

@ObjectType({description:'Token Schema'})
export default class Login {
  @Field()
  token: string
}
