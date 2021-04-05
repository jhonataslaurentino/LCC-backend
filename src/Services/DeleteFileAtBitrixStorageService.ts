import bitrixApi from '../api/bitrix';
import bitrixApiMethods from '../api/Bitrix/bitrixMethods';

interface Request {
  fileId: number;
}

class DeleteFileAtBitrixStorageService {
  public async execute({ fileId }: Request): Promise<void> {
    await bitrixApi.post(bitrixApiMethods.DELETE_FILE, null, {
      params: {
        id: fileId,
      },
    });
  }
}

export default DeleteFileAtBitrixStorageService;
