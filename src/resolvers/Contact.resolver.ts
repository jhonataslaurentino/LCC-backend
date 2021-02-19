import { Arg, Mutation, Resolver, Query } from 'type-graphql';
import Deal from '../Schemas/Deal';
import GetContactsResponse from '../Schemas/GetContactsResponse';
import CreateContactService from '../Services/CreateContactService';
import CreateDealService from '../Services/CreateDealService';
import GetContactsService from '../Services/GetContactsService';
import GetDealService from '../Services/GetDealService';
import { AddContactInput } from './types/Contact/AddContactInput';
import GetContactsInput from './types/Contact/GetContactsInput';

@Resolver()
class ContactResolver {
  @Mutation(() => Deal)
  async addContact(
    @Arg('data')
    {
      name,
      email,
      personType,
      cpf,
      cnpj,
      phone,
      creditType,
      address,
      propertyValue,
      opportunityValue,
      term,
      propertyType,
      companyID,
    }: AddContactInput,
  ): Promise<Deal> {
    const createContactService = new CreateContactService();
    const contactID = await createContactService.execute({
      companyID,
      name,
      email,
      personType,
      cpf,
      cnpj,
      phone,
    });

    const createDealService = new CreateDealService();
    const dealID = await createDealService.execute({
      name,
      companyID,
      contactID,
      opportunityValue,
      term,
      phone,
      email,
      propertyValue,
      propertyType,
      personType,
      address,
      creditType,
    });

    const getDealService = new GetDealService();
    const deal = await getDealService.execute({
      id: dealID,
    });

    return deal;
  }

  @Query(() => GetContactsResponse)
  async getContacts(
    @Arg('data') { companyID, page }: GetContactsInput,
  ): Promise<GetContactsResponse> {
    const getContactsService = new GetContactsService();
    const response = await getContactsService.execute({
      companyID,
      page,
    });
    return response;
  }
}

export default ContactResolver;
