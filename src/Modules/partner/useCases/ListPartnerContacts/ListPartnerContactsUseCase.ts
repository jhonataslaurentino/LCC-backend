import AppError from '../../../../errors/AppError';
import { IBitrixContactRepository } from '../../../Bitrix/repositories/IBitrixContactRepository';
import Role from '../../../company/schemas/Role';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { ListPartnerAssociatesUseCase } from '../ListAssociates/ListAssociatesUseCase';
import { ListPartnerContactsInput } from './ListPartnerContactsInput';
import { ListPartnerContactsSchema } from './ListPartnerContactsSchema';

interface IRequest extends ListPartnerContactsInput {
  partnerID: string;
}

class ListPartnerContactsUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private bitrixContactsRepository: IBitrixContactRepository,
    private listPartnerAssociatesUseCase: ListPartnerAssociatesUseCase,
  ) {}

  async execute({
    page,
    partnerID,
  }: IRequest): Promise<ListPartnerContactsSchema> {
    const partner = await this.partnersRepository.findById(partnerID);
    if (!partner) {
      throw new AppError('Partner does not exists', 404);
    }
    const partnerRole = partner.roleID as Role;
    const companiesToGetContact: number[] = [partner.bitrix_id];
    if (partnerRole.name === 'Company') {
      const associates = await this.listPartnerAssociatesUseCase.execute(
        partnerID,
      );
      associates.forEach(associate => {
        companiesToGetContact.push(associate.bitrix_id);
      });
    }
    const response = await this.bitrixContactsRepository.ListByCompanyID({
      bitrixCompanyID: companiesToGetContact,
      page,
    });
    return response;
  }
}

export { ListPartnerContactsUseCase };
