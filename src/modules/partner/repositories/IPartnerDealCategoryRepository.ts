import { PartnerDealCategory } from '../Schemas/PartnerDealsCategories';

interface ICreatePartnerDealCategory {
  dealCategoryID: string;
  partnerID: string;
}

interface IDeletePartnerDealCategory {
  partnerDealCategoryID: string;
  partnerID: string;
}

interface IPartnerDealCategoryRepository {
  create(data: ICreatePartnerDealCategory): Promise<PartnerDealCategory>;
  delete(data: IDeletePartnerDealCategory): Promise<PartnerDealCategory>;
  findByPartner(partnerID: string): Promise<PartnerDealCategory[]>;
  toggleVisibility(partnerDealCategoryID: string): Promise<PartnerDealCategory>;
  findByID(partnerDealCategoryID: string): Promise<PartnerDealCategory>;
}

export {
  IPartnerDealCategoryRepository,
  ICreatePartnerDealCategory,
  IDeletePartnerDealCategory,
};
