import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Bitrix File Schema' })
class BitrixFile {
  @Field(() => Int)
  ID: number;

  @Field()
  NAME: string;

  @Field()
  TYPE: string;

  @Field({ nullable: true })
  CODE: string;

  @Field(() => Int)
  STORAGE_ID: number;

  @Field(() => Int)
  PARENT_ID: number;

  @Field()
  CREATE_TIME: Date;

  @Field()
  UPDATE_TIME: Date;

  @Field(() => Int)
  FILE_ID: number;

  @Field(() => Int)
  SIZE: number;
}

export { BitrixFile };
