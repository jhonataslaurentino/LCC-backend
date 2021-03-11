import BasicCompanyModel from '../Entities/BasicCompany';
import BasicCompany from '../Schemas/BasicCompany';

class GetBasicCompaniesService {
  public async execute(): Promise<BasicCompany[]> {
    const companies = await BasicCompanyModel.find();
    return companies;
  }
}

export default GetBasicCompaniesService;
