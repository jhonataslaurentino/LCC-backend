import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Delete Simulation Mutation Input' })
class DeleteSimulationInput {
  @Field()
  id: string;
}

export default DeleteSimulationInput;
