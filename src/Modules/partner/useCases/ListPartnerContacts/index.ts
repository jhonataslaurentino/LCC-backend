import { BitrixContactRepository } from '../../../Bitrix/repositories/Implementations/BitrixContactRepository/BitrixContactRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { listPartnerAssociates } from '../ListAssociates';
import { ListPartnerContactsUseCase } from './ListPartnerContactsUseCase';

const partnersRepository = new PartnerRepository();
const bitrixContactsRepository = new BitrixContactRepository();
const listPartnerContactsUseCase = new ListPartnerContactsUseCase(
  partnersRepository,
  bitrixContactsRepository,
  listPartnerAssociates,
);

export { listPartnerContactsUseCase };
