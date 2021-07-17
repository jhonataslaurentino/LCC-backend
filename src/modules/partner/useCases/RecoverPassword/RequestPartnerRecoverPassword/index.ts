import { PartnerRepository } from '../../../repositories/implementations/PartnerRepository';
import { RequestPartnerRecoverPasswordUseCase } from './RequestPartnerRecoverPasswordUseCase';

const partnersRepository = new PartnerRepository();
const requestPartnerRecoverPasswordUseCase = new RequestPartnerRecoverPasswordUseCase(
  partnersRepository,
);

export { requestPartnerRecoverPasswordUseCase };
