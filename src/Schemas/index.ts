import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { resolve } from 'path';
import AdminResolver from '../resolvers/Admin.Resolver';
import BasicCompaniesResolver from '../resolvers/BasicCompany.resolver';
import CompaniesResolver from '../resolvers/Company.resolver';
import ContactResolver from '../resolvers/Contact.resolver';
import DealsResolver from '../resolvers/Deal.resolver';
import DealProductResolver from '../resolvers/DealProduct.resolver';
import RolesResolver from '../resolvers/Role.resolver';
import SimulationsResolver from '../resolvers/Simulation.resolver';

const configureSchema = async (): Promise<GraphQLSchema> => {
  const schema = await buildSchema({
    resolvers: [resolve(__dirname, '..', '**', '*.resolver.ts')],
    emitSchemaFile: true,
    validate: true,
  });
  return schema;
};

export default configureSchema;

// resolvers: [
//   CompaniesResolver,
//   ContactResolver,
//   DealsResolver,
//   DealProductResolver,
//   BasicCompaniesResolver,
//   SimulationsResolver,
//   RolesResolver,
//   AdminResolver,
// ],
