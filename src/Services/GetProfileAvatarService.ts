import AppError from '../errors/AppError';
import { CompanyModel } from '../Modules/company/models/Company';
import GetFileFromBitrixStorageService from './GetFileFromBitrixStorageService';

interface Request {
  companyID: string;
}

interface Response {
  downloadURL: string;
  fileName: string;
}

class GetProfileAvatarService {
  public async execute({ companyID }: Request): Promise<Response> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }
    if (!company.avatarBitrixFileID) {
      throw new AppError('Company does not have a profile avatar yet', 404);
    }
    const getFileFromBitrixStorageService = new GetFileFromBitrixStorageService();
    const {
      fileName,
      downloadURL,
    } = await getFileFromBitrixStorageService.execute({
      fileID: company.avatarBitrixFileID,
    });
    return {
      fileName,
      downloadURL,
    };
  }
}

export default GetProfileAvatarService;
