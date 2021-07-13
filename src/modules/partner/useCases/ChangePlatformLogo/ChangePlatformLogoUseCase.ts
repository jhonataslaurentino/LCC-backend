import endpointsConfig from '../../../../config/endpoints.config';
import AppError from '../../../../errors/AppError';
import { IBitrixDriveRepository } from '../../../Bitrix/repositories/IBitrixDriveRepository';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { Partner } from '../../Schemas/Partner';

interface IChangePlatformLogoUseCase {
  partnerID: string;
  file: Express.Multer.File;
}

class ChangePlatformLogoUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private bitrixDrivesRepository: IBitrixDriveRepository,
  ) {}

  async execute({
    file,
    partnerID,
  }: IChangePlatformLogoUseCase): Promise<Partner> {
    const partner = await this.partnersRepository.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    if (!file) {
      throw new AppError('Invalid File', 400);
    }
    const logo = await this.bitrixDrivesRepository.uploadFile({
      file,
      folderID: endpointsConfig.bitrixAvatarFolderID,
    });
    partner.logoBitrixFileID = logo.ID;
    await this.partnersRepository.save(partner);
    return partner;
  }
}

export { ChangePlatformLogoUseCase };
