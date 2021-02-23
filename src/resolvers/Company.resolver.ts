import { Arg, Mutation, Resolver, Query, Authorized } from 'type-graphql';
import CompanyModel from '../Entities/Company';
import Company from '../Schemas/Company';
import Login from '../Schemas/Login';
import AuthenticateCompanyService from '../Services/AuthenticateCompanyService';
import CreateCompanyAtBitrixService from '../Services/CreateCompanyAtBitrixService';
import CreateCompanyService from '../Services/CreateCompanyService';
import UpdateBitrixIdService from '../Services/UpdateBitrixIdService';
import UpdateBitrixIdInput from './types/Bitrix/UpdateBitrixIdInput';
import AuthenticationCompanyInput from './types/Company/AuthenticationCompanyInput';
import CreateCompanyInput from './types/Company/CreateCompanyInput';

@Resolver()
class CompaniesResolver {
  @Query(() => [Company])
  @Authorized()
  async getCompanies(): Promise<Company[]> {
    const companies = await CompanyModel.find();
    companies.forEach(company => {
      // eslint-disable-next-line no-param-reassign
      company.password = '';
    });
    return companies;
  }

  @Mutation(() => Company)
  async createCompany(
    @Arg('data')
    {
      name,
      personName,
      email,
      password,
      cpf_cnpj,
      bitrix_id,
      phone,
    }: CreateCompanyInput,
  ): Promise<Company> {
    const createCompanyService = new CreateCompanyService();
    const company = await createCompanyService.execute({
      name,
      personName,
      email,
      password,
      cpf_cnpj,
      bitrix_id,
    });

    const createCompanyAtBitrixService = new CreateCompanyAtBitrixService();
    const companyAtBitrixID = await createCompanyAtBitrixService.execute({
      email,
      title: name,
      phone,
    });

    const updateBitrixIdService = new UpdateBitrixIdService();
    const registeredCompany = await updateBitrixIdService.execute({
      company_id: company.id,
      bitrix_id: companyAtBitrixID,
    });

    registeredCompany.password = '';
    return registeredCompany;
  }

  @Mutation(() => Company)
  async setBitrixId(
    @Arg('data')
    { company_id, bitrix_id }: UpdateBitrixIdInput,
  ): Promise<Company> {
    const updateBitrixIdService = new UpdateBitrixIdService();
    const company = await updateBitrixIdService.execute({
      bitrix_id,
      company_id,
    });
    company.password = '';
    return company;
  }

  @Mutation(() => Login)
  async login(
    @Arg('data')
    { email, password }: AuthenticationCompanyInput,
  ): Promise<Login> {
    const authenticateCompanyService = new AuthenticateCompanyService();
    const data = await authenticateCompanyService.execute({ email, password });
    data.company.password = '';
    return data;
  }
}

export default CompaniesResolver;
