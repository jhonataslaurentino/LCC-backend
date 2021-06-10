import {
  IBitrixTimeLineCommentsRepository,
  IListCommentsResponse,
} from '../../repositories/IBitrixTimeLineCommentsRepository';

class ListDealCommentsTimelineUseCase {
  constructor(
    private bitrixTimelineCommentsRepository: IBitrixTimeLineCommentsRepository,
  ) {}

  async execute(id: number): Promise<IListCommentsResponse> {
    const data = await this.bitrixTimelineCommentsRepository.list({
      ENTITY_ID: id,
      ENTITY_TYPE: 'deal',
    });
    return data;
  }
}

export { ListDealCommentsTimelineUseCase };
