import { CompanyModel } from '../modules/company/models/Company';
import Company from '../modules/company/schemas/Company';
import DeleteFileAtBitrixStorageService from './DeleteFileAtBitrixStorageService';

interface Request {
  companyID: string;
}

class RemoveCompanyProfileAvatarService {
  public async execute({ companyID }: Request): Promise<Company> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }
    const deleteFileAtBitrixStorageService = new DeleteFileAtBitrixStorageService();
    await deleteFileAtBitrixStorageService.execute({
      fileId: company.avatarBitrixFileID,
    });
    company.avatarBitrixFileID = null;
    await company.save();
    return company;
  }
}

export default RemoveCompanyProfileAvatarService;
