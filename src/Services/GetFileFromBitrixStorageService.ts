import bitrixApi from '../api/bitrix';

interface Request {
  fileID: number;
}

interface Response {
  downloadURL: string;
  fileName: string;
}

class GetFileFromBitrixStorageService {
  public async execute({ fileID }: Request): Promise<Response> {
    const response = await bitrixApi.get('/disk.file.get', {
      params: {
        id: fileID,
      },
    });
    const { DOWNLOAD_URL, NAME } = response.data.result;
    return {
      downloadURL: DOWNLOAD_URL,
      fileName: NAME,
    };
  }
}

export default GetFileFromBitrixStorageService;
