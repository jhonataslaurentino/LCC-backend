import { Field, Int, ObjectType } from 'type-graphql';
import { BitrixFile } from './BitrixFile';

@ObjectType({ description: 'Bitrix Timeline Comment' })
class BitrixTimeLineComment {
  @Field(() => Int)
  ID: number;

  @Field()
  CREATED: string;

  @Field()
  ENTITY_TYPE: string;

  @Field(() => Int)
  AUTHOR_ID: number;

  @Field()
  COMMENT: string;

  @Field(() => [BitrixFile], { nullable: true })
  FILES: BitrixFile[];
}

export { BitrixTimeLineComment };
