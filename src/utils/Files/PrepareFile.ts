import crypto from 'crypto';
import GetFileType from './GetFileType';
import GetBase64FileEncoded from './GetBase64FileEncoded';

interface Response {
  fileEncoded: string;
  fileType: string;
  fileSecureName: string;
}

const PrepareFile = (fileBase64: string, fileName: string): Response => {
  const fileType = GetFileType(fileBase64);
  const fileEncoded = GetBase64FileEncoded(fileBase64);
  const fileNameWithoutSpaces = fileName.replace(/\s/g, '');
  const fileHash = crypto.randomBytes(10).toString('hex');
  const fileSecureName = `${fileHash}-${fileNameWithoutSpaces}`;
  return {
    fileEncoded,
    fileType,
    fileSecureName,
  };
};
export default PrepareFile;
