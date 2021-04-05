const GetFileType = (fileEncoded: string): string => {
  const fileTypeStartPosition = fileEncoded.indexOf('/');
  const fileTypeEndPosition = fileEncoded.indexOf(';');
  const fileType = fileEncoded.slice(
    fileTypeStartPosition + 1,
    fileTypeEndPosition,
  );
  return fileType;
};

export default GetFileType;
