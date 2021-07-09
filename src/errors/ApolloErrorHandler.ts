import { GraphQLError } from 'graphql';

const ApolloErrorHandler = ({ message }: GraphQLError): Error => {
  return new Error(message);
};

export { ApolloErrorHandler };
