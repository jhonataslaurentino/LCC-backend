import { getCurrentSELICRateUseCase } from '../../../../BCB/useCases/GetCurrentSELICRate';
import { DealCategoryModel } from '../../../../deal/models/DealCategory';
import { DealProductModel } from '../../../../deal/models/DealProduct';
import { SimulationModel } from '../../../models/Simulation';
import Simulation from '../../../schemas/Simulation';
import { CompanyRepository } from '../../../../company/repositories/implementations/CompanyRepository/CompanyRepository';
import { ICreateSimulationDTO } from '../../ISimulationRepository';

class CreateSimulationService {
  public async execute({
    value,
    numberOfInstallments,
    name,
    cpf_cnpj,
    email,
    phone,
    companyID,
    dealCategoryID,
    dealProductID,
    amortizationType,
    personType,
    birthday,
  }: ICreateSimulationDTO): Promise<Simulation> {
    if (!['pf', 'pj'].includes(personType)) {
      throw new Error('You should provide pf or pj on personType field');
    }
    const companiesRepository = new CompanyRepository();
    const company = await companiesRepository.findByID(companyID);
    if (!company) {
      throw new Error('Company does not exists');
    }
    const dealCategory = await DealCategoryModel.findById(dealCategoryID);
    if (!dealCategory) {
      throw new Error('Deal Category does not exists');
    }

    const dealProduct = await DealProductModel.findById(dealProductID);
    if (!dealProduct) {
      throw new Error('Deal product not ');
    }
    const doesDealCategoryIncludesThisProduct = dealCategory.products.includes(
      dealProduct.id,
    );
    if (!doesDealCategoryIncludesThisProduct) {
      throw new Error(
        `The ${dealCategory.name} does not includes ${dealProduct.name}`,
      );
    }
    const SELICRate = await getCurrentSELICRateUseCase.execute();
    const simulation = await SimulationModel.create({
      name,
      value,
      cpf_cnpj,
      email,
      phone,
      numberOfInstallments,
      selicRate: SELICRate.value,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      company: companyID,
      averageRate: dealProduct.averageRate,
      competitiveRate: dealProduct.competitiveRate,
      dealCategory: dealCategory.id,
      dealProduct: dealProduct.id,
      amortizationType,
      personType,
      birthday,
    });

    await companiesRepository.pushSimulation({
      companyID: company.id,
      simulationID: simulation.id,
    });
    return simulation;
  }
}

export default CreateSimulationService;
