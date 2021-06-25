import { RoleRepository } from '../../../company/repositories/implementations/RoleRepository/RoleRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { CreateAssociateUseCase } from './CreateAssociateUseCase';

const rolesRepository = new RoleRepository();
const partnersRepository = new PartnerRepository();
const createAssociateUseCase = new CreateAssociateUseCase(
  partnersRepository,
  rolesRepository,
);

export { createAssociateUseCase };
