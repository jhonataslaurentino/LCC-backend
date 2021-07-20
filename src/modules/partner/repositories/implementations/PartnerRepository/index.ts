import { PartnerModel } from '../../../models/PartnerModel';
import { Partner } from '../../../Schemas/Partner';
import {
  IChangePartnerPassword,
  IChangePartnerURL,
  ICreatePartnerAssociateDTO,
  ICreatePartnerDTO,
  IPartnerRepository,
} from '../../IPartnerRepository';
import { ChangePartnerPasswordPassword } from './services/ChangePartnerPasswordPassword';
import { ChangePartnerURlService } from './services/ChangePartnerURlService';
import { CreateAssociateService } from './services/CreateAssociateService';
import { CreatePartnerService } from './services/CreatePartnerService';
import { DeletePartnerService } from './services/DeletePartnerService';
import { FindPartnerByEmailService } from './services/FindPartnerByEmailService';
import { FindPartnerByIDService } from './services/FindPartnerByIDService';
import { ListAssociatesService } from './services/ListAssociatesService';
import { SavePartnerService } from './services/SavePartnerService';

class PartnerRepository implements IPartnerRepository {
  async delete(id: string): Promise<Partner> {
    const deletePartnerService = new DeletePartnerService();
    const deletedPartner = await deletePartnerService.execute(id);
    return deletedPartner;
  }

  async changePartnerURL(data: IChangePartnerURL): Promise<Partner> {
    const changePartnerURLService = new ChangePartnerURlService();
    const changedPartner = await changePartnerURLService.execute(data);
    return changedPartner;
  }

  async changePartnerPassword(data: IChangePartnerPassword): Promise<Partner> {
    const changePartnerPasswordPassword = new ChangePartnerPasswordPassword();
    const changedPartner = await changePartnerPasswordPassword.execute(data);
    return changedPartner;
  }

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
