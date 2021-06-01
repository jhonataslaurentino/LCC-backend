import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/authConfig';

interface ICreateCompanyTokenDTO {
  eduzzBillID?: number;
  recurrence_code?: number;
  timeToExpireToken?: string;
}

class CreateCompanyTokenService {
  execute({
    eduzzBillID,
    recurrence_code,
    timeToExpireToken,
  }: ICreateCompanyTokenDTO): string {
    const { secret } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: JSON.stringify({
        recurrence_code,
        eduzzBillID,
      }),
      expiresIn: timeToExpireToken || '365d',
    });
    return token;
  }
}

export { CreateCompanyTokenService };
