import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { AuthenticatePartnerUseCase } from './AuthenticatePartnerUseCase';

const partnersRepository = new PartnerRepository();
const authenticatePartnerUseCase = new AuthenticatePartnerUseCase(
  partnersRepository,
);

export { authenticatePartnerUseCase };
