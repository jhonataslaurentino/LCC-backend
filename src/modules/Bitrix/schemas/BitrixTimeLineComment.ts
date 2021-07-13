import { Field, Int, ObjectType } from 'type-graphql';
import { BitrixTimelineFile } from './BitrixTimelineFile';

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

  @Field(() => [BitrixTimelineFile], { nullable: true })
  FILES: BitrixTimelineFile[];
}

export { BitrixTimeLineComment };
