import { Field, InputType } from 'type-graphql';
import { IsBase64 } from 'class-validator';

@InputType({ description: 'Files to store at our system' })
class FileInput {
  @Field({ description: 'The file as a BASE64' })
  @IsBase64({ message: 'You should provide a BASE64 file' })
  file: string;

  @Field({ description: 'The file name' })
  fileName: string;
}

export default FileInput;
