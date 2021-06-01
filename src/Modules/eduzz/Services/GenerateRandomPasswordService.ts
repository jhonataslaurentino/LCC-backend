import AppError from '../../../errors/AppError';

interface IGenerateRandomPassword {
  charactersLength?: number;
}
class GenerateRandomPasswordService {
  execute({ charactersLength = 8 }: IGenerateRandomPassword): string {
    if (!!charactersLength && charactersLength < 8) {
      throw new AppError('The characters length should be greater or equals 8');
    }
    const password = Math.random().toString(36).slice(-charactersLength);
    return password;
  }
}

export { GenerateRandomPasswordService };
