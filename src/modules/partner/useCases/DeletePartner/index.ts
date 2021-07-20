import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { DeletePartnerUseCase } from './DeletePartnerUseCase';

const partnersRepository = new PartnerRepository();
const deletePartnerUseCase = new DeletePartnerUseCase(partnersRepository);

export { deletePartnerUseCase };
