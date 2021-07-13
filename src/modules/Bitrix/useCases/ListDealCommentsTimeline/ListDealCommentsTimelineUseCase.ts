import AppError from '../../../../errors/AppError';
import { ICompanyRepository } from '../../../company/repositories/ICompanyRepository';
import { IBitrixDealRepository } from '../../repositories/IBitrixDealRepository';
import { IBitrixTimeLineCommentsRepository } from '../../repositories/IBitrixTimeLineCommentsRepository';
import { ListDealCommentsTimeLineSchema } from './ListDealCommentsTimeLineSchema';

interface IListDealCommentsTimeLineDTO {
  id: number;
  companyID: string;
}

class ListDealCommentsTimelineUseCase {
  constructor(
    private bitrixTimelineCommentsRepository: IBitrixTimeLineCommentsRepository,
    private bitrixDealsRepository: IBitrixDealRepository,
    private companiesRepository: ICompanyRepository,
  ) {}

  async execute({
    companyID,
    id,
  }: IListDealCommentsTimeLineDTO): Promise<ListDealCommentsTimeLineSchema> {
    const deal = await this.bitrixDealsRepository.findByID(String(id));
    const company = await this.companiesRepository.findByID(companyID);

    if (String(company.bitrix_id) !== String(deal.COMPANY_ID)) {
      throw new AppError('You cannot access this deal');
    }
    const data = await this.bitrixTimelineCommentsRepository.list({
      ENTITY_ID: Number(id),
      ENTITY_TYPE: 'deal',
    });
    return data;
  }
}

export { ListDealCommentsTimelineUseCase };
