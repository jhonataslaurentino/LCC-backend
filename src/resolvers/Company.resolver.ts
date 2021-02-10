import { Arg, Mutation, Resolver, Query } from 'type-graphql';
import CompanyModel from '../Entities/Company';
import Company from '../Schemas/Company';
import CreateCompanyService from '../Services/CreateCompanyService';
import UpdateBitrixIdService from '../Services/SetBitrixService';
import {CreateCompanyInput, UpdateBitrixIdInput} from './types/Company.input';

@Resolver()
class CompaniesResolver {
  @Query(() => [Company])
  async getCompanies(): Promise<Company[]> {
    const companies = await CompanyModel.find();
    return companies
  }

  @Mutation(() => Company)
  async createCompany(
    @Arg('data')
    { name, personName, email, password, cpf_cnpj, bitrix_id }: CreateCompanyInput,
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
    return company;
  }

  @Mutation(() => Company)
  async setBitrixId(
    @Arg('data')
    {company_id, bitrix_id}:UpdateBitrixIdInput
  ):Promise<Company> {
    const updateBitrixIdService = new UpdateBitrixIdService();
    const company = await updateBitrixIdService.execute({bitrix_id, company_id})
    return company
  }
}

export default CompaniesResolver;
