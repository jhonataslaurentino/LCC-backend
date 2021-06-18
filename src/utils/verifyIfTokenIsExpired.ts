import { decode } from 'jsonwebtoken';

const verifyIfTokenIsExpired = (token: string): boolean => {
  const now = Date.now();
  const tokenDecoded = decode(token);
  if (tokenDecoded instanceof Object) {
    const { exp } = tokenDecoded;
    return now >= exp * 1000;
  }
  return true;
};

export { verifyIfTokenIsExpired };
