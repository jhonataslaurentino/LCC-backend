import { BitrixCompanyRepository } from '../../../Bitrix/repositories/Implementations/BitrixCompanyRepository/BitrixCompanyRepository';
import { RoleRepository } from '../../../company/repositories/implementations/RoleRepository/RoleRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { CreateAssociateUseCase } from './CreateAssociateUseCase';

const rolesRepository = new RoleRepository();
const partnersRepository = new PartnerRepository();
const bitrixCompaniesRepository = new BitrixCompanyRepository();
const createAssociateUseCase = new CreateAssociateUseCase(
  partnersRepository,
  rolesRepository,
  bitrixCompaniesRepository,
);

export { createAssociateUseCase };
