import { Request, Response } from 'express';
import request from 'request';
import { GetCompanyAvatarUseCase } from './GetCompanyAvatarUseCase';

class GetCompanyAvatarController {
  constructor(private getCompanyAvatarUseCase: GetCompanyAvatarUseCase) {}

  async handle(req: Request, response: Response): Promise<void> {
    const { id: companyID } = req.params;
    const avatarURL = await this.getCompanyAvatarUseCase.execute(companyID);
    request(
      {
        url: avatarURL,
        encoding: null,
      },
      (err, resp) => {
        if (!err && resp.statusCode === 200) {
          response.set('Content-Type', 'image/jpeg');
          response.send(resp.body);
        }
      },
    );
  }
}

export { GetCompanyAvatarController };
