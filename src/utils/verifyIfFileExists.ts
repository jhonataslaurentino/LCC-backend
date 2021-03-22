import fs from 'fs';
import path from 'path';

interface IVerifyIfFileExits {
  filePath: string;
  fileName: string;
}

const verifyIfFileExists = ({
  filePath,
  fileName,
}: IVerifyIfFileExits): boolean => {
  const pathWithFileName = path.join(filePath, fileName);
  try {
    if (!fs.existsSync(pathWithFileName)) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export default verifyIfFileExists;
