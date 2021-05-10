import axios from 'axios';

export interface SELICRateData {
  data: Date;
  valor: string;
}

const bcbApi = axios.create({
  baseURL:
    'http://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/{1}?formato=json',
});

export default bcbApi;
