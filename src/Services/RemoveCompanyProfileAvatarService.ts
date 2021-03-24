import CompanyModel from '../Entities/Company';
import Company from '../Schemas/Company';
import removeFile from '../utils/removeFile';
import FilesConfig from '../config/Files';

interface Request {
  companyID: string;
}

class RemoveCompanyProfileAvatarService {
  public async execute({ companyID }: Request): Promise<Company> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }
    const avatarFileName = company.avatarFile;
    if (!avatarFileName) {
      throw new Error('Company does not have an avatar yet.');
    }
    if (avatarFileName) {
      try {
        removeFile({
          filePath: FilesConfig.companiesProfile,
          fileName: avatarFileName,
        });
      } catch (error) {
        console.log('File does not exists');
      }
    }
    return company;
  }
}

export default RemoveCompanyProfileAvatarService;
