import { Stream } from 'stream';
import path from 'path';
import { createWriteStream } from 'fs';
import crypto from 'crypto';

interface Request {
  filename: string;
  createReadStream: () => Stream;
  folderToSave: string[];
}

class UploadFileService {
  public async execute({
    folderToSave,
    filename,
    createReadStream,
  }: Request): Promise<string> {
    const fileNameWithoutSpaces = filename.replace(/\s/g, '');
    const fileHash = crypto.randomBytes(10).toString('hex');
    const fileSecureName = `${fileHash}-${fileNameWithoutSpaces}`;
    const pathName = path.resolve(
      __dirname,
      '..',
      '..',
      'files',
      ...folderToSave,
      fileSecureName,
    );
    return new Promise(resolve =>
      createReadStream()
        .pipe(createWriteStream(pathName))
        .on('finish', () => resolve(fileSecureName))
        .on('error', () => {
          throw new Error('We cannot upload this file');
        }),
    );
  }
}

export default UploadFileService;
