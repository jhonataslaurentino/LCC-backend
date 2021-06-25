import { PartnerModel } from '../../../models/PartnerModel';
import { Partner } from '../../../Schemas/Partner';
import {
  ICreatePartnerAssociateDTO,
  ICreatePartnerDTO,
  IPartnerRepository,
} from '../../IPartnerRepository';
import { CreateAssociateService } from './services/CreateAssociateService';
import { CreatePartnerService } from './services/CreatePartnerService';
import { FindPartnerByEmailService } from './services/FindPartnerByEmailService';
import { FindPartnerByIDService } from './services/FindPartnerByIDService';
import { ListAssociatesService } from './services/ListAssociatesService';
import { SavePartnerService } from './services/SavePartnerService';

class PartnerRepository implements IPartnerRepository {
  async listAssociates(partnerID: string): Promise<Partner[]> {
    const listAssociatesService = new ListAssociatesService();
    const associates = await listAssociatesService.execute(partnerID);
    return associates;
  }

  async save(partner: Partner): Promise<void> {
    const savePartnerService = new SavePartnerService();
    await savePartnerService.execute(partner);
  }

  async findById(id: string): Promise<Partner | null> {
    const findPartnerByIDService = new FindPartnerByIDService();
    const partner = await findPartnerByIDService.execute(id);
    return partner;
  }

  async createAssociate(data: ICreatePartnerAssociateDTO): Promise<Partner> {
    const createAssociateService = new CreateAssociateService();
    const partner = await createAssociateService.execute(data);
    return partner;
  }

  async findByEmail(email: string): Promise<Partner> {
    const findPartnerByEmailService = new FindPartnerByEmailService();
    const partner = await findPartnerByEmailService.execute(email);
    return partner;
  }

  async list(): Promise<Partner[]> {
    const partners = await PartnerModel.find();
    return partners;
  }

  async create(data: ICreatePartnerDTO): Promise<Partner> {
    const createPartnerService = new CreatePartnerService();
    const partner = await createPartnerService.execute(data);
    return partner;
  }
}

export { PartnerRepository };
