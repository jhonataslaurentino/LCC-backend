import { hash } from 'bcryptjs';
import AppError from '../../../../../../errors/AppError';
import { PartnerModel } from '../../../../models/PartnerModel';
import { Partner } from '../../../../Schemas/Partner';
import { ICreatePartnerAssociateDTO } from '../../../IPartnerRepository';

class CreateAssociateService {
  async execute({
    bitrix_id,
    cpf_cnpj,
    email,
    name,
    partnerCreatorID,
    password,
    phone,
    roleID,
  }: ICreatePartnerAssociateDTO): Promise<Partner> {
    const creatorPartner = await PartnerModel.findById(partnerCreatorID);
    if (!creatorPartner) {
      throw new AppError('Partner does not exists', 404);
    }
    const partnerAlreadyExists = await PartnerModel.findOne({
      email,
    });
    if (partnerAlreadyExists) {
      throw new AppError('Partner already exists');
    }
    const hashedPassword = await hash(password, 8);
    const associate = await PartnerModel.create({
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
      primaryColor: creatorPartner.primaryColor,
      roleID,
      secondaryColor: creatorPartner.secondaryColor,
      simulations: [],
      updatedAt: Date.now(),
      siteURL: creatorPartner.siteURL,
      createdBy: creatorPartner.id,
    });
    return associate;
  }
}

export { CreateAssociateService };
