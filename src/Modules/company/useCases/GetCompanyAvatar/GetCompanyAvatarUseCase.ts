import AppError from '../../../../errors/AppError';
import { IBitrixDriveRepository } from '../../../Bitrix/repositories/IBitrixDriveRepository';
import { ICompanyRepository } from '../../repositories/ICompanyRepository';

class GetCompanyAvatarUseCase {
  constructor(
    private companiesRepository: ICompanyRepository,
    private bitrixDriveRepository: IBitrixDriveRepository,
  ) {}

  async execute(companyID: string): Promise<string> {
    const company = await this.companiesRepository.findByID(companyID);
    if (!company) {
      throw new AppError('Company does not exists');
    }
    if (!company.avatarBitrixFileID) {
      throw new AppError('Company does not have a profile avatar yet', 404);
    }
    const avatarFileURL = await this.bitrixDriveRepository.getFile(
      String(company.avatarBitrixFileID),
    );
    return avatarFileURL;
  }
}

export { GetCompanyAvatarUseCase };
