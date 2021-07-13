import { BitrixContactRepository } from '../../repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { ListContactsUseCase } from './ListContactsUseCase';

const bitrixContactRepository = new BitrixContactRepository();
const listContactsUseCase = new ListContactsUseCase(bitrixContactRepository);
export { listContactsUseCase };
