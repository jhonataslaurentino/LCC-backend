import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { resolve } from 'path';

const configureSchema = async (): Promise<GraphQLSchema> => {
  const schema = await buildSchema({
    resolvers: [resolve(__dirname, '..', '**', '*.resolver.ts')],
    emitSchemaFile: true,
    validate: true,
  });
  return schema;
};

export default configureSchema;
