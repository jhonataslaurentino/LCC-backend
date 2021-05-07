import { ExpressContext } from 'apollo-server-express';

export interface ContextData {
  token: string;
  id: string;
}

const context = ({ req: request }: ExpressContext): ContextData => {
  const authHeader = request.headers.authorization || '';
  const [, token] = authHeader.split(' ');
  const requestData = { token, id: '' };
  return requestData;
};

export default context;
