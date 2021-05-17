import bcbApi from '../../api/bcb';
import SELICRate from '../../Schemas/SELICRate';

class GetSELICRateService {
  public async execute(): Promise<SELICRate> {
    const { data } = await bcbApi.get('/');
    return {
      date: data[0].data,
      value: Number(data[0].valor),
    };
  }
}

export default GetSELICRateService;
