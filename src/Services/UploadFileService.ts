import { Stream } from 'stream';
import path from 'path';
import { createWriteStream } from 'fs';

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
    const pathName = path.resolve(
      '..',
      '..',
      'files',
      ...folderToSave,
      fileNameWithoutSpaces,
    );
    return new Promise(resolve =>
      createReadStream()
        .pipe(createWriteStream(pathName))
        .on('finish', () => resolve(fileNameWithoutSpaces))
        .on('error', () => {
          throw new Error('We cannot upload this file');
        }),
    );
  }
}

export default UploadFileService;
