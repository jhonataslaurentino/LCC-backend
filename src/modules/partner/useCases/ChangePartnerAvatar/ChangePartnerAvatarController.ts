import { Request, Response } from 'express';
import { ChangePartnerAvatarUseCase } from './ChangePartnerAvatarUseCase';

class ChangePartnerAvatarController {
  constructor(private changePartnerAvatarUseCase: ChangePartnerAvatarUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const { id: partnerID } = request.user;
    await this.changePartnerAvatarUseCase.execute({
      file,
      partnerID,
    });
    return response.status(200).send();
  }
}
export { ChangePartnerAvatarController };
