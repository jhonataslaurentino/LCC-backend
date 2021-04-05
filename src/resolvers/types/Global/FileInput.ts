import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Files to store at our system' })
class FileInput {
  @Field({ description: 'You should provide a BASE64 file' })
  file: string;

  @Field({ description: 'The file name' })
  fileName: string;
}

export default FileInput;
