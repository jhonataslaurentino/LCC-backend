import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Bitrix Timeline Comment' })
class BitrixTimeLineComment {
  @Field(() => Int)
  ID: number;

  @Field(() => Date)
  CREATED: Date;

  @Field()
  ENTITY_TYPE: string;

  @Field(() => Int)
  AUTHOR_ID: number;

  @Field()
  COMMENT: string;

  @Field(() => [String])
  FILES: string[];
}

export { BitrixTimeLineComment };
