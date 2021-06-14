import { ListDealCommentsTimeLineSchema } from '../useCases/ListDealCommentsTimeline/ListDealCommentsTimeLineSchema';

interface IGenericObjectDTO {
  [key: string]: string | number | Date;
}

interface IListCommentsDTO {
  ENTITY_ID: number;
  ENTITY_TYPE: string;
  filter?: IGenericObjectDTO;
}

interface IAddCommentDTO {
  ENTITY_ID: number;
  ENTITY_TYPE: string;
  COMMENT: string;
  AUTHOR_ID: number;
}

interface IBitrixTimeLineCommentsRepository {
  list(data: IListCommentsDTO): Promise<ListDealCommentsTimeLineSchema>;
}

export { IBitrixTimeLineCommentsRepository, IListCommentsDTO };
