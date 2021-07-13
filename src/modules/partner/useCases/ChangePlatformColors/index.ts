import { BitrixDriveRepository } from '../../../Bitrix/repositories/Implementations/BitrixDriveRepository/BitrixDriveRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { ChangePlatformColorUseCase } from './ChangePlatformColorsUseCase';

const partnersRepository = new PartnerRepository();
const bitrixDriveRepository = new BitrixDriveRepository();
const changePlatformColorsUseCase = new ChangePlatformColorUseCase(
  partnersRepository,
  bitrixDriveRepository,
);
export { changePlatformColorsUseCase };
