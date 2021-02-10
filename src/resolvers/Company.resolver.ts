import { Arg, Mutation, Resolver, Query } from 'type-graphql';
import CompanyModel from '../Entities/Company';
import Company from '../Schemas/Company';
import CreateCompanyService from '../Services/CreateCompanyService';
import CompaniesInput from './types/Company.input';

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
    { name, personName, email, password, cpf_cnpj, bitrix_id }: CompaniesInput,
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
}

export default CompaniesResolver;
