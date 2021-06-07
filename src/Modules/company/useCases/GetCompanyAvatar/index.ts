import { BitrixDriveRepository } from '../../../Bitrix/repositories/Implementations/BitrixDriveRepository/BitrixDriveRepository';
import { CompanyRepository } from '../../repositories/implementations/CompanyRepository/CompanyRepository';
import { GetCompanyAvatarController } from './GetCompanyAvatarController';
import { GetCompanyAvatarUseCase } from './GetCompanyAvatarUseCase';

const companiesRepository = new CompanyRepository();
const bitrixDriveRepository = new BitrixDriveRepository();
const getCompanyAvatarUseCase = new GetCompanyAvatarUseCase(
  companiesRepository,
  bitrixDriveRepository,
);
const getCompanyAvatarController = new GetCompanyAvatarController(
  getCompanyAvatarUseCase,
);

export { getCompanyAvatarController };
