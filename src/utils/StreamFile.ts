/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Response } from 'express';
import path from 'path';
import fs from 'fs';
import mime from '../config/fileTypeMap';

const StreamFile = (
  response: Response,
  directory: string,
  fileName: string,
): void => {
  const file = path.join(directory, fileName);
  const fileType = mime[path.extname(file).slice(1)] || 'text/plain';
  const fileStream = fs.createReadStream(file);
  fileStream.on('open', () => {
    response.set('Content-Type', fileType);
    fileStream.pipe(response);
  });

  fileStream.on('error', () => {
    response.set('Content-Type', 'text/plain');
    response.status(404).end('Not found');
  });
};

export default StreamFile;
