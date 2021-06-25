import { AxiosInstance } from 'axios';
import { BitrixFile } from '../../../../schemas/BitrixFile';
import { IUploadFileDTO } from '../../../IBitrixDriveRepository';

class UploadFileToBitrixDriveService {
  constructor(private api: AxiosInstance) {}

  async execute({
    fileBase64,
    fileName,
    folderID,
  }: IUploadFileDTO): Promise<BitrixFile> {
    const response = await this.api.post('/disk.folder.uploadfile', {
      id: folderID,
      fileContent: fileBase64,
      data: {
        NAME: fileName,
      },
    });
    const { result } = response.data;
    return result;
  }
}

export { UploadFileToBitrixDriveService };
