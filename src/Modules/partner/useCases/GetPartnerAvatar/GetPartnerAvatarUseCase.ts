import AppError from '../../../../errors/AppError';
import { IBitrixDriveRepository } from '../../../Bitrix/repositories/IBitrixDriveRepository';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';

class GetPartnerAvatarUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private bitrixDrivesRepository: IBitrixDriveRepository,
  ) {}

  async execute(id: string): Promise<string> {
    const partner = await this.partnersRepository.findById(id);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    if (!partner.avatarBitrixFileID) {
      throw new AppError('Partner do not have an avatar yet', 404);
    }
    const file = await this.bitrixDrivesRepository.getFile(
      String(partner.avatarBitrixFileID),
    );
    return file;
  }
}

export { GetPartnerAvatarUseCase };
