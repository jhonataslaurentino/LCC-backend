import endpointsConfig from '../../../../config/endpoints.config';
import AppError from '../../../../errors/AppError';
import { IBitrixDriveRepository } from '../../../Bitrix/repositories/IBitrixDriveRepository';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { Partner } from '../../Schemas/Partner';

interface IChangePartnerAvatarUseCaseDTO {
  partnerID: string;
  file: Express.Multer.File;
}

class ChangePartnerAvatarUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private bitrixDrivesRepository: IBitrixDriveRepository,
  ) {}

  async execute({
    file,
    partnerID,
  }: IChangePartnerAvatarUseCaseDTO): Promise<Partner> {
    const partner = await this.partnersRepository.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    if (!file) {
      throw new AppError('Invalid File', 400);
    }
    const avatar = await this.bitrixDrivesRepository.uploadFile({
      file,
      folderID: endpointsConfig.bitrixAvatarFolderID,
    });
    partner.avatarBitrixFileID = avatar.ID;
    await this.partnersRepository.save(partner);
    return partner;
  }
}

export { ChangePartnerAvatarUseCase };
