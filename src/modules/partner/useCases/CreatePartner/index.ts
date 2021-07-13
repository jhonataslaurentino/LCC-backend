import { RoleRepository } from '../../../company/repositories/implementations/RoleRepository/RoleRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { CreatePartnerUseCase } from './CreatePartnerUseCase';

const rolesRepository = new RoleRepository();
const partnersRepository = new PartnerRepository();
const createPartnerUseCase = new CreatePartnerUseCase(
  partnersRepository,
  rolesRepository,
);

export { createPartnerUseCase };
