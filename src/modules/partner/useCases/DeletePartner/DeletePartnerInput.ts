import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Delete partner arguments' })
class DeletePartnerInput {
  @Field()
  id: string;
}

export { DeletePartnerInput };
