import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import cors from 'cors';
import endpoint from './config/endpoints.config';
import configureSchema from './Schemas';
import connectToDatabase from './database';
import context from './Context/context';

const main = async () => {
  await connectToDatabase();
  const schema = await configureSchema();
  const server = new ApolloServer({
    schema,
    context,
  });
  const app = express();
  app.use(cors());
  server.applyMiddleware({ app });
  app.listen(endpoint.serverPort, () => {
    console.log(`🚀 Server started on port ${endpoint.serverPort}`);
  });
};

main().catch(error => {
  console.log(error, 'error');
});
