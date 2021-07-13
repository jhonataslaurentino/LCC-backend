/* eslint-disable no-console */
import 'reflect-metadata';
import 'express-async-errors';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import cors from 'cors';
import endpoint from './config/endpoints.config';
import configureSchema from './Schemas';
import connectToDatabase from './database';
import context from './Context/context';
import ExpressErrorHandler from './errors/ExpressErrorHandler';
import routes from './modules/global/routes';
import { RoleRepository } from './modules/company/repositories/implementations/RoleRepository/RoleRepository';
import { ApolloErrorHandler } from './errors/ApolloErrorHandler';

const main = async () => {
  await connectToDatabase();
  const rolesRepository = new RoleRepository();
  await rolesRepository.insertDefaultRoles();
  const schema = await configureSchema();
  const server = new ApolloServer({
    schema,
    context,
    formatError: ApolloErrorHandler,
  });
  const app = express();
  app.use(cors());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(express.json({ limit: '50mb' }));

  app.use(routes);
  app.use(ExpressErrorHandler);
  server.applyMiddleware({ app });

  app.listen(endpoint.serverPort, () => {
    console.log(`🚀 Server started on port ${endpoint.serverPort}`);
  });
};

main().catch(error => {
  console.log(error, 'error');
});
