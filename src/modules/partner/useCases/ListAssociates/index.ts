import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { ListPartnerAssociatesUseCase } from './ListAssociatesUseCase';

const partnersRepository = new PartnerRepository();
const listPartnerAssociates = new ListPartnerAssociatesUseCase(
  partnersRepository,
);

export { listPartnerAssociates };
