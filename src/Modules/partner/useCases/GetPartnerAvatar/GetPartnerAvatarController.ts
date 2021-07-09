import { Request, Response } from 'express';
import request from 'request';
import { GetPartnerAvatarUseCase } from './GetPartnerAvatarUseCase';

class GetPartnerAvatarController {
  constructor(private getPartnerAvatarUseCase: GetPartnerAvatarUseCase) {}

  async handle(req: Request, response: Response): Promise<void> {
    const { id: partnerID } = req.params;
    const partnerAvatarURL = await this.getPartnerAvatarUseCase.execute(
      partnerID,
    );
    request(
      {
        url: partnerAvatarURL,
        encoding: null,
      },
      (err, resp) => {
        if (!err && resp.statusCode === 200) {
          response.set('Content-Type', 'image/png');
          response.send(resp.body);
        }
      },
    );
  }
}

export { GetPartnerAvatarController };
