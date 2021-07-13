import { IBitrixDriveRepository } from '../../../Bitrix/repositories/IBitrixDriveRepository';
import { ICompanyRepository } from '../../repositories/ICompanyRepository';
import Company from '../../schemas/Company';

class RemoveCompanyAvatarUseCase {
  constructor(
    private companiesRepository: ICompanyRepository,
    private bitrixDriveRepository: IBitrixDriveRepository,
  ) {}

  async execute(companyID: string): Promise<Company> {
    const company = await this.companiesRepository.removeAvatar(companyID);
    await this.bitrixDriveRepository.removeFile(
      String(company.avatarBitrixFileID),
    );
    return company;
  }
}
export { RemoveCompanyAvatarUseCase };
