import { AxiosInstance } from 'axios';
import bitrixApi from '../../../../../api/bitrix';
import { IBitrixDriveRepository } from '../../IBitrixDriveRepository';
import { GetFileFromBitrixDriveService } from './services/GetFileFromBitrixDriveService';
import { RemoveFileFromBitrixDriveService } from './services/RemoveFileFromBitrixDriveService';

class BitrixDriveRepository implements IBitrixDriveRepository {
  private api: AxiosInstance;

  constructor() {
    this.api = bitrixApi;
  }

  async removeFile(id: string): Promise<void> {
    const removeFileFromBitrixDriveService = new RemoveFileFromBitrixDriveService(
      this.api,
    );
    await removeFileFromBitrixDriveService.execute(id);
  }

  async getFile(id: string): Promise<string> {
    const getFileFromBitrixDriveService = new GetFileFromBitrixDriveService(
      this.api,
    );
    const downloadURL = await getFileFromBitrixDriveService.execute(id);
    return downloadURL;
  }
}

export { BitrixDriveRepository };
