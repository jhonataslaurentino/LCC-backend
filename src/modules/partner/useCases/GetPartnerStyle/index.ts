import { BitrixDriveRepository } from '../../../Bitrix/repositories/Implementations/BitrixDriveRepository/BitrixDriveRepository';
import { PartnerRepository } from '../../repositories/implementations/PartnerRepository';
import { GetPartnerStyleUseCase } from './GetPartnerStyleUseCase';

const partnersRepository = new PartnerRepository();
const bitrixDriveRepository = new BitrixDriveRepository();
const getPartnerStyleUseCase = new GetPartnerStyleUseCase(
  partnersRepository,
  bitrixDriveRepository,
);

export { getPartnerStyleUseCase };
