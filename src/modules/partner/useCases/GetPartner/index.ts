import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { GetPartnerUseCase } from './GetPartnerUseCase';

const partnersRepository = new PartnerRepository();
const getPartnerUseCase = new GetPartnerUseCase(partnersRepository);
export { getPartnerUseCase };
