import { Arg, Mutation, Resolver, Query } from 'type-graphql';
import BasicCompany from '../Schemas/BasicCompany';
import CreateBasicCompanyService from '../Services/CreateBasicCompanyService';
import GetBasicCompaniesService from '../Services/GetBasicCompaniesService';
import CreateBasicCompanyInput from './types/BasicCompany/CreateBasicCompanyInput';

@Resolver()
class BasicCompaniesResolver {
  @Query(() => [BasicCompany], { nullable: true })
  async getBasicCompanies(): Promise<BasicCompany[]> {
    const getBasicCompaniesService = new GetBasicCompaniesService();
    const companies = await getBasicCompaniesService.execute();
    return companies;
  }

  @Mutation(() => BasicCompany)
  async createBasicCompany(
    @Arg('data') { email, name, phone }: CreateBasicCompanyInput,
  ): Promise<BasicCompany> {
    const createBasicCompanyService = new CreateBasicCompanyService();
    const basicCompany = await createBasicCompanyService.execute({
      name,
      email,
      phone,
    });
    return basicCompany;
  }
}

export default BasicCompaniesResolver;
