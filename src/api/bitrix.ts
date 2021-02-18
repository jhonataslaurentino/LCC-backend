import axios from 'axios';

const bitrixApi = axios.create({
  baseURL:
    'https://lucrandocomcredito.bitrix24.com.br/rest/37/ufuozwlfqsr9y5am/',
});

export default bitrixApi;
