import { ExpressContext } from 'apollo-server-express';

interface RequestData {
  token: string;
}

const context = ({ req }: ExpressContext): RequestData => {
  const authHeader = req.headers.authorization || '';
  const [, token] = authHeader.split(' ');
  const requestData = { token };
  return requestData;
};

export default context;
