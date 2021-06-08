import {
  Arg,
  Mutation,
  Resolver,
  Query,
  UseMiddleware,
  Ctx,
} from 'type-graphql';
import { ContextData } from '../Context/context';
import AuthenticatedChecker from '../middlewares/AuthenticatedChecker';
import { BitrixDeal } from '../Modules/Bitrix/schemas/BitrixDeal';
import { createRealEstateDealUseCase } from '../Modules/Bitrix/useCases/CreateRealEstateDeal';
import { createVehicularDealUseCase } from '../Modules/Bitrix/useCases/CreateVehicularDeal';
import { listContactsUseCase } from '../Modules/Bitrix/useCases/ListContacts';
import GetContactsResponse from '../Schemas/GetContactsResponse';
import { AddContactInput } from './types/Contact/AddContactInput';
import { AddVehicularCreditContactInput } from './types/Contact/AddVehicularCreditContactInput';
import GetContactsInput from './types/Contact/GetContactsInput';

@Resolver()
class ContactResolver {
  @Mutation(() => BitrixDeal)
  async addVehicularCreditContact(
    @Arg('data')
    {
      birthday,
      clientSituation,
      cnpj,
      companyID,
      contactMonthlyIncome,
      cpf,
      email,
      name,
      phone,
      vehicleManufacturedDate,
      vehicleModel,
      vehicleName,
      vehicleTargetValue,
      vehicleValue,
      vehicularCreditType,
      opportunityValue,
      address,
      personType,
    }: AddVehicularCreditContactInput,
  ): Promise<BitrixDeal> {
    const emailInLoweCase = email.toLowerCase();

    const deal = await createVehicularDealUseCase.execute({
      companyID,
      name,
      email: emailInLoweCase,
      cpf,
      cnpj,
      phone,
      birthday,
      personType,
      clientSituation,
      contactMonthlyIncome,
      opportunityValue,
      vehicleManufacturedDate,
      vehicleModel,
      vehicleName,
      vehicleTargetValue,
      vehicleValue,
      vehicularCreditType,
      address,
    });

    return deal;
  }

  @Mutation(() => BitrixDeal)
  async addRealEstateContact(
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
      companyID,
      birthday,
      propertyID,
    }: AddContactInput,
  ): Promise<BitrixDeal> {
    const emailInLowerCase = email.toLowerCase();

    const deal = await createRealEstateDealUseCase.execute({
      address,
      birthday,
      companyID,
      creditType,
      email: emailInLowerCase,
      name,
      opportunityValue,
      personType,
      phone,
      propertyID,
      propertyValue,
      term,
      cnpj,
      cpf,
    });

    return deal;
  }

  @Query(() => GetContactsResponse)
  @UseMiddleware(AuthenticatedChecker)
  async getContacts(
    @Ctx()
    ctx: ContextData,
    @Arg('data') { page }: GetContactsInput,
  ): Promise<GetContactsResponse> {
    const { id: companyID } = ctx;
    const response = await listContactsUseCase.execute({
      companyID,
      page,
    });
    return response;
  }
}

export default ContactResolver;
