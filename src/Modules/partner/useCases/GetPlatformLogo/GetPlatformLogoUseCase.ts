import AppError from '../../../../errors/AppError';
import { IBitrixDriveRepository } from '../../../Bitrix/repositories/IBitrixDriveRepository';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';

class GetPlatformLogoUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private bitrixDriversRepository: IBitrixDriveRepository,
  ) {}

  async execute(id: string): Promise<string> {
    const partner = await this.partnersRepository.findById(id);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const file = await this.bitrixDriversRepository.getFile(
      String(partner.logoBitrixFileID),
    );
    return file;
  }
}

export { GetPlatformLogoUseCase };
