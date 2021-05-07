import { verify } from 'jsonwebtoken';
import { MiddlewareFn, NextFn } from 'type-graphql';
import authConfig from '../config/authConfig';
import { ContextData } from '../Context/context';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const AuthenticatedChecker: MiddlewareFn<ContextData> = async (
  { context },
  next: NextFn,
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
