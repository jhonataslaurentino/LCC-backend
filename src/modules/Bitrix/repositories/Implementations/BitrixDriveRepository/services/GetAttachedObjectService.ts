import { AxiosInstance } from 'axios';
import { BitrixFile } from '../../../../schemas/BitrixFile';

class GetAttachedObjectService {
  constructor(private api: AxiosInstance) {}

  async execute(id: number): Promise<BitrixFile> {
    const response = await this.api.get('/disk.attachedObject.get', {
      params: {
        id,
      },
    });
    return response.data.result;
  }
}

export { GetAttachedObjectService };
