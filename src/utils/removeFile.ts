import fs from 'fs';
import path from 'path';
import verifyIfFileExists from './verifyIfFileExists';

interface IRemoveFile {
  filePath: string;
  fileName: string;
}

const removeFile = ({ filePath, fileName }: IRemoveFile): void => {
  const fileExits = verifyIfFileExists({ filePath, fileName });
  if (!fileExits) {
    throw new Error('File does not exists');
  }
  const pathWithFileName = path.join(filePath, fileName);

  try {
    fs.unlinkSync(pathWithFileName);
  } catch (error) {
    throw new Error('The file can not be deleted');
  }
};

export default removeFile;
