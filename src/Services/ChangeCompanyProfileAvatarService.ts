import CompanyModel from '../Entities/Company';
import DeleteFileAtBitrixStorageService from './DeleteFileAtBitrixStorageService';
import UploadFileToBitrixStorageService from './UploadFileToBitrixStorageService';

interface Request {
  companyID: string;
  fileName: string;
  fileBase64Encoded: string;
}

class ChangeCompanyProfileAvatarService {
  public async execute({
    fileName,
    fileBase64Encoded,
    companyID,
  }: Request): Promise<void> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }
    if (company.avatarBitrixFileID) {
      const deleteFileAtBitrixStorageService = new DeleteFileAtBitrixStorageService();
      await deleteFileAtBitrixStorageService.execute({
        fileId: company.avatarBitrixFileID,
      });
    }
    const uploadFileToBitrixStorageService = new UploadFileToBitrixStorageService();
    const fileId = await uploadFileToBitrixStorageService.execute({
      fileBase64: fileBase64Encoded,
      fileName,
      folderId: 483,
    });
    company.avatarBitrixFileID = fileId;
    await company.save();
  }
}

export default ChangeCompanyProfileAvatarService;
