import { BitrixDriveRepository } from '../../../Bitrix/repositories/Implementations/BitrixDriveRepository/BitrixDriveRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { ChangePlatformLogoController } from './ChangePlatformLogoController';
import { ChangePlatformLogoUseCase } from './ChangePlatformLogoUseCase';

const partnersRepository = new PartnerRepository();
const bitrixDriversRepository = new BitrixDriveRepository();
const changePlatformLogoUseCase = new ChangePlatformLogoUseCase(
  partnersRepository,
  bitrixDriversRepository,
);
const changePlatformLogoController = new ChangePlatformLogoController(
  changePlatformLogoUseCase,
);

export { changePlatformLogoController };
