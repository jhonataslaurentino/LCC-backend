import { BitrixTimeLineComment } from '../schemas/BitrixTimeLineComment';

interface IGenericObjectDTO {
  [key: string]: string | number | Date;
}

interface IListCommentsDTO {
  ENTITY_ID: number;
  ENTITY_TYPE: string;
  filter?: IGenericObjectDTO;
}

interface IListCommentsResponse {
  result: BitrixTimeLineComment[];
  total: number;
  next: number;
}

interface IBitrixTimeLineCommentsRepository {
  list(data: IListCommentsDTO): Promise<IListCommentsResponse>;
}

export {
  IBitrixTimeLineCommentsRepository,
  IListCommentsDTO,
  IListCommentsResponse,
};
