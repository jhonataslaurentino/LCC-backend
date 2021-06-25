import { BitrixFile } from '../schemas/BitrixFile';

interface IUploadFileDTO {
  folderID: number;
  fileBase64: string;
  fileName: string;
}

interface IBitrixDriveRepository {
  getFile(id: string): Promise<string>;
  removeFile(id: string): Promise<void>;
  uploadFile(data: IUploadFileDTO): Promise<BitrixFile>;
  getAttachedObject(id: number): Promise<BitrixFile>;
}

export { IBitrixDriveRepository, IUploadFileDTO };
