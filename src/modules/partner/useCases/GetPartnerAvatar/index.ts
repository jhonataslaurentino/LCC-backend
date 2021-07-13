import { BitrixDriveRepository } from '../../../Bitrix/repositories/Implementations/BitrixDriveRepository/BitrixDriveRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { GetPartnerAvatarController } from './GetPartnerAvatarController';
import { GetPartnerAvatarUseCase } from './GetPartnerAvatarUseCase';

const partnersRepository = new PartnerRepository();
const bitrixDrivesRepository = new BitrixDriveRepository();
const getPartnerAvatarUseCase = new GetPartnerAvatarUseCase(
  partnersRepository,
  bitrixDrivesRepository,
);
const getPartnerAvatarController = new GetPartnerAvatarController(
  getPartnerAvatarUseCase,
);
export { getPartnerAvatarController };
