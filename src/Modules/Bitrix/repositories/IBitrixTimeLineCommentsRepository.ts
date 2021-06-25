import { BitrixTimeLineComment } from '../schemas/BitrixTimeLineComment';
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
  files: Express.Multer.File[];
}

interface IBitrixTimeLineCommentsRepository {
  list(data: IListCommentsDTO): Promise<ListDealCommentsTimeLineSchema>;
  add(data: IAddCommentDTO): Promise<BitrixTimeLineComment>;
  get(id: number): Promise<BitrixTimeLineComment>;
}

export { IBitrixTimeLineCommentsRepository, IListCommentsDTO, IAddCommentDTO };
