import { ApolloServer } from 'apollo-server-express';
import express, { Request } from 'express';

import 'reflect-metadata';
import cors from 'cors';
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
  app.listen(4000, () => {
    console.log('🚀 Server started on port 4000');
  });
};

main().catch(error => {
  console.log(error, 'error');
});
