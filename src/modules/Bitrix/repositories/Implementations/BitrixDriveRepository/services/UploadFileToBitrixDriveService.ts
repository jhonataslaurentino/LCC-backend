import { AxiosInstance } from 'axios';
import fs from 'fs';
import { BitrixFile } from '../../../../schemas/BitrixFile';
import { IUploadFileDTO } from '../../../IBitrixDriveRepository';

class UploadFileToBitrixDriveService {
  constructor(private api: AxiosInstance) {}

  async execute({ folderID, file }: IUploadFileDTO): Promise<BitrixFile> {
    const response = await this.api.post('/disk.folder.uploadfile', {
      id: folderID,
      fileContent: fs.readFileSync(file.path, {
        encoding: 'base64',
      }),
      data: {
        NAME: `${file.filename}_${file.originalname}`,
      },
    });
    const { result } = response.data;
    await fs.promises.unlink(file.path);
    return result;
  }
}

export { UploadFileToBitrixDriveService };
