import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import configureSchema from './Schemas';
import connectToDatabase from './database';
import cors from 'cors'

const main = async () => {
  await connectToDatabase();
  const schema = await configureSchema();
  const server = new ApolloServer({ schema });
  const app = express();
  app.use(cors())
  server.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log('🚀 Server started on port 4000');
  });
};

main().catch(error => {
  console.log(error, 'error');
});
