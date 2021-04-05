import CompanyModel from '../Entities/Company';
import ExpressError from '../errors/ExpressError';
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
      throw new ExpressError('Company does not exists');
    }
    if (!company.avatarBitrixFileID) {
      throw new ExpressError('Company does not have a profile avatar yet');
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
