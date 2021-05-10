import bcbApi from '../../api/bcb';

interface Response {
  date: string;
  value: number;
}

class GetSELICRateService {
  public async execute(): Promise<Response> {
    const { data } = await bcbApi.get('/');
    return {
      date: data[0].data,
      value: Number(data[0].valor),
    };
  }
}

export default GetSELICRateService;
