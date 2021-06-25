import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { ListPartnersUseCase } from './ListPartnesUseCase';

const partnersRepository = new PartnerRepository();
const listPartnersUseCase = new ListPartnersUseCase(partnersRepository);

export { listPartnersUseCase };
