import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import CompaniesResolver from '../resolvers/Company.resolver';

const configureSchema = async (): Promise<GraphQLSchema> => {
  const schema = await buildSchema({
    resolvers: [CompaniesResolver],
    emitSchemaFile: true,
    validate: false,
  });
  return schema;
};

export default configureSchema;
