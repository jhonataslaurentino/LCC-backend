import axios from 'axios';

const bitrixApi = axios.create({
  baseURL:
    'https://lucrandocomcredito.bitrix24.com.br/rest/37/ufuozwlfqsr9y5am/',
});

export const bitrixApiMethods = {
  GET_DEALS: 'crm.deal.list',
  GET_DEAL: 'crm.deal.get',
  ADD_DEAL: 'crm.deal.add',
  GET_CONTACTS: 'crm.contact.list',
  GET_CONTACT: 'crm.contact.get',
  ADD_CONTACT: 'crm.contact.add',
  GET_COMPANIES: 'crm.company.list',
  GET_COMPANY: 'crm.company.get',
  ADD_COMPANY: 'crm.company.add',
};

export default bitrixApi;
