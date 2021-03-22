import { Stream } from 'stream';
import { Field, InputType } from 'type-graphql';

@InputType({ description: 'File type' })
class FileType {
  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;

  @Field(() => Stream, { nullable: true })
  createReadStream: () => Stream;
}

export default FileType;
