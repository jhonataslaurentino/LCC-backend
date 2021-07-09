import { getCurrentSELICRateUseCase } from '../../../../BCB/useCases/GetCurrentSELICRate';
import { DealCategoryRepository } from '../../../../deal/repositories/implementations/DealCategory';
import { DealProductRepository } from '../../../../deal/repositories/implementations/DealProduct';
import { DealCategory } from '../../../../deal/schemas/DealCategory';
import { DealProduct } from '../../../../deal/schemas/DealProduct';
import { PartnerRepository } from '../../../../partner/repositories/implementations/PartnerRepository';
import { SimulationModel } from '../../../models/Simulation';
import Simulation from '../../../schemas/Simulation';
import { ICreateSimulationDTO } from '../../ISimulationRepository';

class CreatePartnerSimulationService {
  async execute({
    amortizationType,
    birthday,
    companyID,
    cpf_cnpj,
    dealCategoryID,
    dealProductID,
    email,
    name,
    numberOfInstallments,
    personType,
    phone,
    value,
  }: ICreateSimulationDTO): Promise<Simulation> {
    if (!['pf', 'pj'].includes(personType)) {
      throw new Error('You should provide pf or pj on personType field');
    }
    const partnersRepository = new PartnerRepository();
    const partner = await partnersRepository.findById(companyID);
    if (!partner) {
      throw new Error('Partner does not exists');
    }

    const dealCategoriesRepository = new DealCategoryRepository();
    const dealCategory = await dealCategoriesRepository.findByID(
      dealCategoryID,
    );
    if (!dealCategory) {
      throw new Error('Deal Category does not exists');
    }

    const dealProductsRepository = new DealProductRepository();
    const dealProduct = (await dealProductsRepository.findById(
      dealProductID,
    )) as DealProduct;
    if (!dealProduct) {
      throw new Error('Deal product not exists');
    }
    const productDealCategory = dealProduct.dealCategory as DealCategory;
    const doesDealCategoryIncludesThisProduct =
      productDealCategory.id === dealCategory.id;
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

    return simulation;
  }
}

export { CreatePartnerSimulationService };
