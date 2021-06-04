import axios, { AxiosInstance } from 'axios';
import { SELIC } from '../../schemas/selic';
import { IBCBRepository } from '../IBCBRepository';

class BCBRepository implements IBCBRepository {
  private api: AxiosInstance;

  private static INSTANCE: BCBRepository;

  constructor() {
    this.api = axios.create({
      baseURL:
        'http://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/{1}?formato=json',
    });
  }

  public static getInstance(): BCBRepository {
    if (!BCBRepository.INSTANCE) {
      BCBRepository.INSTANCE = new BCBRepository();
    }
    return BCBRepository.INSTANCE;
  }

  async getCurrentSELICRate(): Promise<SELIC> {
    const { data } = await this.api.get('/');
    return {
      date: data[0].data,
      value: Number(data[0].valor),
    };
  }
}

export { BCBRepository };
