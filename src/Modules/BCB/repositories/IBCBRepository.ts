import { SELIC } from '../schemas/selic';

interface IBCBRepository {
  getCurrentSELICRate(): Promise<SELIC>;
}

export { IBCBRepository };
