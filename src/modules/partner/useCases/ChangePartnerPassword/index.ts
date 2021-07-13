import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { ChangePartnerPasswordUseCase } from './ChangePartnerPasswordUseCase';

const partnersRepository = new PartnerRepository();
const changePartnerPasswordUseCase = new ChangePartnerPasswordUseCase(
  partnersRepository,
);

export { changePartnerPasswordUseCase };
