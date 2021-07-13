import { BitrixDriveRepository } from '../../../Bitrix/repositories/Implementations/BitrixDriveRepository/BitrixDriveRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { ChangePartnerAvatarController } from './ChangePartnerAvatarController';
import { ChangePartnerAvatarUseCase } from './ChangePartnerAvatarUseCase';

const partnersRepository = new PartnerRepository();
const bitrixDrivesRepository = new BitrixDriveRepository();
const changePartnerAvatarUseCase = new ChangePartnerAvatarUseCase(
  partnersRepository,
  bitrixDrivesRepository,
);
const changePartnerAvatarController = new ChangePartnerAvatarController(
  changePartnerAvatarUseCase,
);

export { changePartnerAvatarController };
