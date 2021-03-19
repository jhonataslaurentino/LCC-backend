import { Response } from 'express';
import path from 'path';
import fs from 'fs';
import CompanyModel from '../Entities/Company';

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
      __dirname,
      '..',
      '..',
      'files',
      ...pathToGetProfilePicture,
    );
    // const fileName = company.avatarFile;
    const fileName = 'logo-lcc.png';
    const pathWithFileName = path.join(directory, fileName || '');
    try {
      if (!fs.existsSync(pathWithFileName)) {
        throw new Error('We cannot access this file');
      }
      return response.sendFile(pathWithFileName);
    } catch (error) {
      throw new Error('We cannot access this file');
    }
  }
}

export default StreamCompanyAvatarService;
