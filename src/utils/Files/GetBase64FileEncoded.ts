const GetBase64FileEncoded = (fileEncoded: string): string => {
  const fileEncodedStartPosition = fileEncoded.indexOf(',');
  const fileEncodedEndPosition = fileEncoded.length;
  const fileType = fileEncoded.slice(
    fileEncodedStartPosition + 1,
    fileEncodedEndPosition,
  );
  return fileType;
};

export default GetBase64FileEncoded;
