import AppError from '../../../../errors/AppError';
import { CompanyModel } from '../../../company/models/Company';
import { IBitrixDealRepository } from '../../repositories/IBitrixDealRepository';
import { BitrixDeal } from '../../schemas/BitrixDeal';

interface IUpdateDealCommentUseCase {
  companyID: string;
  id: number;
  comment: string;
}
class UpdateDealCommentUseCase {
  constructor(private bitrixDealRepository: IBitrixDealRepository) {}

  async execute({
    companyID,
    comment,
    id,
  }: IUpdateDealCommentUseCase): Promise<BitrixDeal> {
    const company = await CompanyModel.findById(companyID);
    if (!company) {
      throw new AppError('Company does not exists');
    }
    const bitrixDeal = await this.bitrixDealRepository.findByID(String(id));
    if (Number(bitrixDeal.COMPANY_ID) !== company.bitrix_id) {
      throw new AppError('You cannot comment this deal', 401);
    }
    const updatedBitrixDeal = await this.bitrixDealRepository.UpdateDealField({
      id: String(id),
      COMMENTS: comment,
    });
    return updatedBitrixDeal;
  }
}

export { UpdateDealCommentUseCase };
