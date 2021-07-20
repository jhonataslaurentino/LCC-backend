import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { ChangePartnerURLUseCase } from './ChangePartnerURLUseCase';

const partnersRepository = new PartnerRepository();
const changePartnerURLUseCase = new ChangePartnerURLUseCase(partnersRepository);
export { changePartnerURLUseCase };
