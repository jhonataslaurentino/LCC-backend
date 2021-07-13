import bitrixApi from '../api/bitrix';
import bitrixApiMethods from '../api/Bitrix/bitrixMethods';
import createAddDealRequestBody from '../api/Bitrix/createAddDealRequestBody';
import getBitrixProperty from '../api/Bitrix/getBitrixProperty';
import { CompanyModel } from '../modules/company/models/Company';

interface Request {
  name: string;
  companyID: string;
  contactID: number;
  opportunityValue: number;
  term: number;
  phone: string;
  email: string;
  propertyType: string;
  propertyValue: number;
  personType: string;
  address: string;
  creditType: string;
}

class CreateDealService {
  public async execute({
    name,
    companyID,
    contactID,
    opportunityValue,
    term,
    phone,
    email,
    propertyType,
    propertyValue,
    personType,
    address,
    creditType,
  }: Request): Promise<number> {
    const company = await CompanyModel.findById(companyID).exec();
    if (!company) {
      throw new Error('Company does not exists');
    }

    const property = getBitrixProperty({ propertyType });

    const addDealRequestBody = createAddDealRequestBody({
      name,
      companyID: company.bitrix_id,
      contactID,
      opportunityValue,
      term,
      phone,
      email,
      propertyValue,
      propertyType: property.type,
      propertyID: property.ID,
      personType,
      address,
      creditType,
    });
    const response = await bitrixApi.post(
      `${bitrixApiMethods.ADD_DEAL}.json`,
      addDealRequestBody,
    );

    const dealID = response.data.result;
    if (!dealID) {
      throw new Error('It was not possible to create a deal');
    }
    return dealID;
  }
}

export default CreateDealService;
