import { PartnerRepository } from '../../../repositories/implementations/PartnerRepository';
import { RecoverPartnerPasswordUseCase } from './RecoverPartnerPasswordUseCase';

const partnersRepository = new PartnerRepository();
const recoverPartnerPasswordUseCase = new RecoverPartnerPasswordUseCase(
  partnersRepository,
);

export { recoverPartnerPasswordUseCase };
