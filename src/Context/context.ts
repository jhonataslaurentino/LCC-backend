import { ExpressContext } from 'apollo-server-express';

const context = ({ req }: ExpressContext): string => {
  const authHeader = req.headers.authorization || '';
  const [, token] = authHeader.split(' ');
  return token;
};

export default context;
