import { Field, Int, ObjectType } from 'type-graphql';
import { BitrixTimeLineComment } from '../../schemas/BitrixTimeLineComment';

@ObjectType({ description: 'List Deal Comments Timeline schema' })
class ListDealCommentsTimeLineSchema {
  @Field(() => [BitrixTimeLineComment], { nullable: true })
  result: BitrixTimeLineComment[];

  @Field(() => Int)
  total: number;
}

export { ListDealCommentsTimeLineSchema };
