import { Response } from 'express';
import path from 'path';
import CompanyModel from '../Entities/Company';
import StreamFile from '../utils/StreamFile';

interface Request {
  companyID: string;
  response: Response;
}

class StreamCompanyAvatarService {
  public async execute({ companyID, response }: Request): Promise<void> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }
    const pathToGetProfilePicture = ['images', 'companies', 'profile'];
    const directory = path.resolve(
      '..',
      '..',
      'files',
      ...pathToGetProfilePicture,
    );
    const fileName = company.avatarFile;
    StreamFile(response, directory, fileName);
  }
}

export default StreamCompanyAvatarService;
