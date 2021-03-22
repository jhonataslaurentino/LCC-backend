import { Stream } from 'stream';
import CompanyModel from '../Entities/Company';
import UploadFileService from './UploadFileService';

interface Request {
  companyID: string;
  filename: string;
  createReadStream: () => Stream;
}

class ChangeUserProfileAvatarService {
  public async execute({
    filename,
    createReadStream,
    companyID,
  }: Request): Promise<boolean> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
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

export default ChangeUserProfileAvatarService;
