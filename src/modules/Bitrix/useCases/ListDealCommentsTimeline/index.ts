import { CompanyRepository } from '../../../company/repositories/implementations/CompanyRepository/CompanyRepository';
import { BitrixDealRepository } from '../../repositories/Implementations/BitrixDealRepository/BitrixDealRepository';
import { BitrixTimeLineCommentsRepository } from '../../repositories/Implementations/BitrixTimelineCommentsRepository/BitrixTimeLineCommentsRepository';
import { ListDealCommentsTimelineUseCase } from './ListDealCommentsTimelineUseCase';

const bitrixTimelineCommentsRepository = new BitrixTimeLineCommentsRepository();
const bitrixDealsRepository = new BitrixDealRepository();
const companiesRepository = new CompanyRepository();
const listDealCommentsTimelineUseCase = new ListDealCommentsTimelineUseCase(
  bitrixTimelineCommentsRepository,
  bitrixDealsRepository,
  companiesRepository,
);

export { listDealCommentsTimelineUseCase };
