import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Bitrix File' })
class BitrixTimelineFile {
  @Field(() => Int)
  id: number;

  @Field()
  date: string;

  @Field()
  type: string;

  @Field()
  name: string;

  @Field()
  urlDownload: string;
}

export { BitrixTimelineFile };
