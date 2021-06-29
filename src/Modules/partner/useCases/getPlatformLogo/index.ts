import { BitrixDriveRepository } from '../../../Bitrix/repositories/Implementations/BitrixDriveRepository/BitrixDriveRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { GetPlatformLogoController } from './GetPlatformLogoController';
import { GetPlatformLogoUseCase } from './GetPlatformLogoUseCase';

const partnersRepository = new PartnerRepository();
const bitrixDriversRepository = new BitrixDriveRepository();
const getPlatformLogoUseCase = new GetPlatformLogoUseCase(
  partnersRepository,
  bitrixDriversRepository,
);
const getPlatformLogoController = new GetPlatformLogoController(
  getPlatformLogoUseCase,
);

export { getPlatformLogoUseCase, getPlatformLogoController };
