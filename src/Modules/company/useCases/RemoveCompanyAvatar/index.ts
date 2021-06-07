import { BitrixDriveRepository } from '../../../Bitrix/repositories/Implementations/BitrixDriveRepository/BitrixDriveRepository';
import { CompanyRepository } from '../../repositories/implementations/CompanyRepository/CompanyRepository';
import { RemoveCompanyAvatarUseCase } from './RemoveCompanyAvatarUseCase';

const bitrixDriveRepository = new BitrixDriveRepository();
const companiesRepository = new CompanyRepository();
const removeCompanyAvatarUseCase = new RemoveCompanyAvatarUseCase(
  companiesRepository,
  bitrixDriveRepository,
);

export { removeCompanyAvatarUseCase };
