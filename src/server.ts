import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import configureSchema from './Schemas';
import connectToDatabase from './database';

const main = async () => {
  await connectToDatabase();
  const schema = await configureSchema();
  const server = new ApolloServer({ schema });
  const app = express();
  server.applyMiddleware({ app });
  app.listen(3333, () => {
    console.log('🚀 Server started on port 3333');
  });
};

main().catch(error => {
  console.log(error, 'error');
});
