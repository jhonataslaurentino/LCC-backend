import { Arg, Mutation, Resolver } from 'type-graphql';
import Deal from '../Schemas/Deal';
import AddContactService from '../Services/AddContactService';
import AddDealService from '../Services/AddDealService';
import GetDealService from '../Services/GetDealService';
import { AddContactInput } from './types/Contact/AddContactInput';

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
    const addContactService = new AddContactService();
    const contactID = await addContactService.execute({
      name,
      email,
      personType,
      cpf,
      cnpj,
      phone,
    });

    const addDealService = new AddDealService();
    const dealID = await addDealService.execute({
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
}

export default ContactResolver;
