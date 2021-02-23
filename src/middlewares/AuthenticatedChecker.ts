import { AuthChecker } from 'type-graphql';

interface TokenData {
  token: string;
}

interface ContextData {
  token: TokenData;
}

const AuthenticatedChecker: AuthChecker<ContextData> = async ({
  context,
}): Promise<boolean> => {
  const { token } = context;
  if (!token) {
    throw new Error('JWT token is missing');
  }
  return true;
};

export default AuthenticatedChecker;
