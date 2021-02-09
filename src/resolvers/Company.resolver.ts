import { Arg, Mutation, Resolver, Query } from 'type-graphql';
import { CompaniesModel, Company } from '../Entities/Company';
import CreateCompanyService from '../Services/CreateCompanyService';
import CompaniesInput from './types/Company.input';

@Resolver()
class CompaniesResolver {
  @Query(() => [Company])
  async getCompanies(): Promise<Company[]> {
    // eslint-disable-next-line no-return-await
    return await CompaniesModel.find();
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
