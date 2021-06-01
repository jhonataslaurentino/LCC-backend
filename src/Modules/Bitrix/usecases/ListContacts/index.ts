import { BitrixContactRepository } from '../../repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { ListContactsUseCase } from './ListContactsUseCase';

const bitrixContactRepository = BitrixContactRepository.getInstance();
const listContactsUseCase = new ListContactsUseCase(bitrixContactRepository);
export { listContactsUseCase };
