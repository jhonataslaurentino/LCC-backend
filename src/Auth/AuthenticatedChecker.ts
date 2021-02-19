import { Request } from 'apollo-server-express';
import { AuthChecker } from 'type-graphql';

interface AuthCheckerData {
  token: string;
}

const AuthenticatedChecker: AuthChecker<AuthCheckerData> = async ({
  context,
}) => {
  console.log('We are cheking if the user is authenticated');
  console.log(context);
  return true;
};

export default AuthenticatedChecker;
