interface IBitrixDriveRepository {
  getFile(id: string): Promise<string>;
  removeFile(id: string): Promise<void>;
}

export { IBitrixDriveRepository };
