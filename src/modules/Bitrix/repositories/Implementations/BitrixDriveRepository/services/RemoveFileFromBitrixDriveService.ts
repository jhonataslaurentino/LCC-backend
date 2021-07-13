import { AxiosInstance } from 'axios';
import AppError from '../../../../../../errors/AppError';

class RemoveFileFromBitrixDriveService {
  constructor(private api: AxiosInstance) {}

  async execute(id: string): Promise<void> {
    const response = await this.api.post(
      '/disk.file.delete',
      {},
      {
        params: {
          id,
        },
      },
    );
    if (!response.data.result) {
      throw new AppError('It was not possible delete this file');
    }
  }
}

export { RemoveFileFromBitrixDriveService };
