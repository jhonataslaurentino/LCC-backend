import { verify } from 'jsonwebtoken';
import {
  MiddlewareFn,
  MiddlewareInterface,
  NextFn,
  ResolverData,
} from 'type-graphql';
import authConfig from '../config/authConfig';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export interface ContextData {
  token: string;
  id: string;
}

export interface ReponseFromAuthenticatedChecker {
  id: string;
}

const AuthenticatedChecker: MiddlewareFn<ContextData> = async (
  { context },
  next,
): Promise<string> => {
  const { token } = context;
  if (!token) {
    throw new Error('JWT token is missing');
  }
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub: id } = decoded as TokenPayload;
    context.id = id;
    return next();
  } catch (error) {
    throw new Error('Invalid JWT token');
  }
};

export default AuthenticatedChecker;

// class AuthenticatedChecker implements MiddlewareInterface {
//   async use({  }: ResolverData, next: NextFn) {
//     const { token } = context;
//     if (!token) {
//       throw new Error('JWT token is missing');
//     }
//     try {
//       const decoded = verify(token, authConfig.jwt.secret);
//       const { sub: id } = decoded as TokenPayload;
//       context.id = id;
//       return next();
//     } catch (error) {
//       throw new Error('Invalid JWT token');
//     }
//   }
// }
