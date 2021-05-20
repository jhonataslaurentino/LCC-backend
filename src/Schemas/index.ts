import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
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
    resolvers: [
      CompaniesResolver,
      ContactResolver,
      DealsResolver,
      DealProductResolver,
      BasicCompaniesResolver,
      SimulationsResolver,
      RolesResolver,
      AdminResolver,
    ],
    emitSchemaFile: true,
    validate: false,
  });
  return schema;
};

export default configureSchema;
