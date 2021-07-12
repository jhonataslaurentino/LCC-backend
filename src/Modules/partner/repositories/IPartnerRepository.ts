import { DocumentType } from '@typegoose/typegoose';
import { Partner } from '../Schemas/Partner';

interface ICreatePartnerDTO {
  name: string;
  companyName: string;
  email: string;
  password: string;
  bitrix_id: number;
  cpf_cnpj: string;
  phone: string;
  roleID: string;
  siteURL: string;
}

interface ICreatePartnerAssociateDTO
  extends Omit<ICreatePartnerDTO, 'siteURL'> {
  partnerCreatorID: string;
}

interface IAddDealCategory {
  dealCategoryID: string;
  partnerID: string;
}

interface IPartnerRepository {
  findById(id: string): Promise<Partner | DocumentType<Partner> | null>;
  create(data: ICreatePartnerDTO): Promise<Partner | DocumentType<Partner>>;
  list(): Promise<Partner[] | DocumentType<Partner>[]>;
  findByEmail(email: string): Promise<Partner | DocumentType<Partner> | null>;
  save(partner: Partner): Promise<void>;
  createAssociate(
    data: ICreatePartnerAssociateDTO,
  ): Promise<Partner | DocumentType<Partner>>;
  listAssociates(partnerID: string): Promise<Partner[]>;
}

export {
  IPartnerRepository,
  ICreatePartnerDTO,
  ICreatePartnerAssociateDTO,
  IAddDealCategory,
};