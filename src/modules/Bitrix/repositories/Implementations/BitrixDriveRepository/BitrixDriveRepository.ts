import { AxiosInstance } from 'axios';
import bitrixApi from '../../../../../api/bitrix';
import { BitrixFile } from '../../../schemas/BitrixFile';
import {
  IBitrixDriveRepository,
  IUploadFileDTO,
} from '../../IBitrixDriveRepository';
import { GetAttachedObjectService } from './services/GetAttachedObjectService';
import { GetFileFromBitrixDriveService } from './services/GetFileFromBitrixDriveService';
import { RemoveFileFromBitrixDriveService } from './services/RemoveFileFromBitrixDriveService';
import { UploadFileToBitrixDriveService } from './services/UploadFileToBitrixDriveService';

class BitrixDriveRepository implements IBitrixDriveRepository {
  private api: AxiosInstance;

  constructor() {
    this.api = bitrixApi;
  }

  async getAttachedObject(id: number): Promise<BitrixFile> {
    const getAttachedObjectService = new GetAttachedObjectService(this.api);
    const attachedFile = await getAttachedObjectService.execute(id);
    return attachedFile;
  }

  async uploadFile(data: IUploadFileDTO): Promise<BitrixFile> {
    const uploadFileToBitrixDriveService = new UploadFileToBitrixDriveService(
      this.api,
    );
    const file = await uploadFileToBitrixDriveService.execute(data);
    return file;
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
