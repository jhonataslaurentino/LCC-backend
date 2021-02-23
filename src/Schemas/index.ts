import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import CompaniesResolver from '../resolvers/Company.resolver';
import ContactResolver from '../resolvers/Contact.resolver';
import DealsResolver from '../resolvers/Deal.resolver';

const configureSchema = async (): Promise<GraphQLSchema> => {
  const schema = await buildSchema({
    resolvers: [CompaniesResolver, ContactResolver, DealsResolver],
    emitSchemaFile: true,
    validate: false,
  });
  return schema;
};

export default configureSchema;
