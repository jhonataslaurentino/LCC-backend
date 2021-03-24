import { Response } from 'express';
import path from 'path';
import fs from 'fs';
import CompanyModel from '../Entities/Company';

interface Request {
  companyID: string;
  response: Response;
}

class StreamCompanyAvatarService {
  public async execute({
    companyID,
    response,
  }: Request): Promise<Response | void> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }
    if (!company.avatarFile) {
      return response.status(404).send('company does not have an avatar yet');
    }
    const pathToGetProfilePicture = ['images', 'companies', 'profile'];
    const directory = path.resolve(
      __dirname,
      '..',
      '..',
      'files',
      ...pathToGetProfilePicture,
    );
    const fileName = company.avatarFile;
    const pathWithFileName = path.join(directory, fileName || '');
    try {
      if (!fs.existsSync(pathWithFileName)) {
        throw new Error('company does not have an avatar yet');
      }
      return response.sendFile(pathWithFileName);
    } catch (error) {
      throw new Error('company does not have an avatar yet');
    }
  }
}

export default StreamCompanyAvatarService;
