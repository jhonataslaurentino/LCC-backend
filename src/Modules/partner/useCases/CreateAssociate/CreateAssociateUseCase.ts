import { IRoleRepository } from '../../../company/repositories/IRoleRepository';
import { IPartnerRepository } from '../../repositories/IPartnerRepository';
import { Partner } from '../../Schemas/Partner';

interface ICreateAssociate {
  name: string;
  email: string;
  password: string;
  cpf_cnpj: string;
  phone: string;
  partnerCreatorID: string;
}

class CreateAssociateUseCase {
  constructor(
    private partnersRepository: IPartnerRepository,
    private rolesRepository: IRoleRepository,
  ) {}

  async execute({
    cpf_cnpj,
    email,
    name,
    partnerCreatorID,
    password,
    phone,
  }: ICreateAssociate): Promise<Partner> {
    const role = await this.rolesRepository.findByName('User');
    const partner = await this.partnersRepository.createAssociate({
      bitrix_id: 129,
      cpf_cnpj,
      email,
      name,
      partnerCreatorID,
      password,
      phone,
      roleID: role.id,
    });
    return partner;
  }
}

export { CreateAssociateUseCase };
