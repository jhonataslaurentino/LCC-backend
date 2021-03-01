import axios from 'axios';
import endpoint from '../config/endpoints.config';

const bitrixApi = axios.create({
  baseURL: endpoint.bitrixBaseURL,
});

export default bitrixApi;
