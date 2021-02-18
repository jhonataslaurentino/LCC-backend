import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Contact Info Schema' })
export default class ContactInfo {
  @Field(() => Int)
  ID: number;

  @Field()
  VALUE_TYPE: string;

  @Field()
  VALUE: string;
}
