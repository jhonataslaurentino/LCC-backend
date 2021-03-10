import { Field, InputType } from 'type-graphql';

import { Stream } from 'stream';

@InputType({ description: 'Change Profile picture args' })
export default class ChangeProfilePictureInput {
  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;

  @Field(() => Stream)
  createReadStream: () => Stream;
}
