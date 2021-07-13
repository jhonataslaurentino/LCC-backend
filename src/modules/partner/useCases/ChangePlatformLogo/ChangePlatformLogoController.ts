import { Request, Response } from 'express';
import { ChangePlatformLogoUseCase } from './ChangePlatformLogoUseCase';

class ChangePlatformLogoController {
  constructor(private changePlatformLogoUseCase: ChangePlatformLogoUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const { id: partnerID } = request.user;
    await this.changePlatformLogoUseCase.execute({
      file,
      partnerID,
    });
    return response.status(200).send();
  }
}

export { ChangePlatformLogoController };
