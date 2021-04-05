import bitrixApi from '../api/bitrix';
import bitrixApiMethods from '../api/Bitrix/bitrixMethods';
import PrepareFile from '../utils/Files/PrepareFile';

interface Request {
  folderId: number;
  fileBase64: string;
  fileName: string;
}

class UploadFileToBitrixStorageService {
  public async execute({
    folderId,
    fileBase64,
    fileName,
  }: Request): Promise<number> {
    const { fileEncoded, fileSecureName, fileType } = PrepareFile(
      fileBase64,
      fileName,
    );
    const response = await bitrixApi.post(bitrixApiMethods.UPLOAD_FILE, {
      id: folderId,
      fileContent: fileEncoded,
      data: {
        NAME: `${fileSecureName}.${fileType}`,
      },
    });
    const { result } = response.data;
    return result.ID;
  }
}

export default UploadFileToBitrixStorageService;
