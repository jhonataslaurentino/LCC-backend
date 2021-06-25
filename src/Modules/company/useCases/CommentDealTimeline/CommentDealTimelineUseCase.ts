import AppError from '../../../../errors/AppError';
import { IBitrixDealRepository } from '../../../Bitrix/repositories/IBitrixDealRepository';
import { IBitrixTimeLineCommentsRepository } from '../../../Bitrix/repositories/IBitrixTimeLineCommentsRepository';
import { BitrixTimeLineComment } from '../../../Bitrix/schemas/BitrixTimeLineComment';
import { ICompanyRepository } from '../../repositories/ICompanyRepository';

interface ICommentDealTimelineDTO {
  dealID: number;
  comment: string;
  files: Express.Multer.File[];
  companyID: string;
}

class CommentDealTimelineUseCase {
  constructor(
    private companiesRepository: ICompanyRepository,
    private bitrixDealsRepository: IBitrixDealRepository,
    private bitrixTimelineCommentsRepository: IBitrixTimeLineCommentsRepository,
  ) {}

  async execute({
    comment,
    companyID,
    dealID,
    files,
  }: ICommentDealTimelineDTO): Promise<BitrixTimeLineComment> {
    const company = await this.companiesRepository.findByID(companyID);
    if (!company) {
      throw new AppError('Company does not exists', 404);
    }
    const deal = await this.bitrixDealsRepository.findByID(String(dealID));
    if (String(deal.COMPANY_ID) !== String(company.bitrix_id)) {
      throw new AppError('You cannot access this deal', 403);
    }
    const bitrixComment = await this.bitrixTimelineCommentsRepository.add({
      AUTHOR_ID: company.bitrix_id,
      COMMENT: comment,
      ENTITY_ID: dealID,
      ENTITY_TYPE: 'deal',
      files,
    });
    return bitrixComment;
  }
}

export { CommentDealTimelineUseCase };
