import { Stream } from 'stream';
import CompanyModel from '../Entities/Company';
import UploadFileService from './UploadFileService';
import FilesConfig from '../config/Files';
import removeFile from '../utils/removeFile';

interface Request {
  companyID: string;
  filename: string;
  createReadStream: () => Stream;
}

class ChangeCompanyProfileAvatarService {
  public async execute({
    filename,
    createReadStream,
    companyID,
  }: Request): Promise<boolean> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }
    const avatarFileName = company.avatarFile;
    if (avatarFileName) {
      try {
        removeFile({
          filePath: FilesConfig.companiesProfile,
          fileName: avatarFileName,
        });
      } catch (error) {
        console.log('File does not exits');
      }
    }
    const pathToSaveProfilePicture = ['images', 'companies', 'profile'];
    const uploadFileService = new UploadFileService();
    const fileNameFromUploadFileService = await uploadFileService.execute({
      createReadStream,
      filename,
      folderToSave: pathToSaveProfilePicture,
    });
    company.avatarFile = fileNameFromUploadFileService;
    await company.save();
    return true;
  }
}

export default ChangeCompanyProfileAvatarService;
