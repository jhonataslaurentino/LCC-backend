import { Request } from 'express';

interface AuthCheckerData {
  request: Request;
}
const context = async ({ request }: AuthCheckerData): Promise<void> => {
  console.log(request);
  // const token = request.headers.authorization || '';
  // return token;
};

export default context;
