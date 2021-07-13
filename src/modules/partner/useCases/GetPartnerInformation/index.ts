import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { GetPartnerInformationUseCase } from './GetPartnerInformationUseCase';

const partnersRepository = new PartnerRepository();
const getPartnerInformationUseCase = new GetPartnerInformationUseCase(
  partnersRepository,
);

export { getPartnerInformationUseCase };
