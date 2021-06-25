import { hash } from 'bcryptjs';
import AppError from '../../../../../../errors/AppError';
import { PartnerModel } from '../../../../models/PartnerModel';
import { Partner } from '../../../../Schemas/Partner';
import { ICreatePartnerDTO } from '../../../IPartnerRepository';

class CreatePartnerService {
  async execute({
    bitrix_id,
    cpf_cnpj,
    email,
    name,
    password,
    phone,
    roleID,
    siteURL,
  }: ICreatePartnerDTO): Promise<Partner> {
    const partnerAlreadyExists = await PartnerModel.findOne({
      email,
    });
    if (partnerAlreadyExists) {
      throw new AppError('Partner already exists');
    }
    const hashedPassword = await hash(password, 8);
    const partner = await PartnerModel.create({
      associates: [],
      avatarBitrixFileID: null,
      bitrix_id,
      cpf_cnpj,
      createdAt: Date.now(),
      email,
      isSuspended: false,
      logoBitrixFileID: null,
      name,
      password: hashedPassword,
      phone,
      primaryColor: '#294D91',
      roleID,
      secondaryColor: '#009C54',
      simulations: [],
      updatedAt: Date.now(),
      siteURL,
      createdBy: null,
    });
    return partner;
  }
}

export { CreatePartnerService };
