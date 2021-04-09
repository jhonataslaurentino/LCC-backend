import { AxiosError } from 'axios';
import bitrixApi from '../api/bitrix';
import bitrixApiMethods from '../api/Bitrix/bitrixMethods';

interface Request {
  fileId: number;
}

class DeleteFileAtBitrixStorageService {
  public async execute({ fileId }: Request): Promise<void> {
    try {
      await bitrixApi.post(bitrixApiMethods.DELETE_FILE, null, {
        params: {
          id: fileId,
        },
      });
    } catch (error) {
      if (error.response) {
        const err = error as AxiosError;
        if (err.response.status === 400) {
          // eslint-disable-next-line no-console
          console.log('File does not exists');
        }
      }
    }
  }
}

export default DeleteFileAtBitrixStorageService;
