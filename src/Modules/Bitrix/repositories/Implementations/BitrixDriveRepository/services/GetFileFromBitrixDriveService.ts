import { AxiosInstance } from 'axios';

class GetFileFromBitrixDriveService {
  constructor(private api: AxiosInstance) {}

  async execute(fileID: string): Promise<string> {
    const response = await this.api.get('/disk.file.get', {
      params: {
        id: fileID,
      },
    });
    const { DOWNLOAD_URL } = response.data.result;
    return DOWNLOAD_URL;
  }
}

export { GetFileFromBitrixDriveService };
