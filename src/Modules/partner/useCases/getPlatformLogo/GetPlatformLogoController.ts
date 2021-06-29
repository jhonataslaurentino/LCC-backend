import { Request, Response } from 'express';
import request from 'request';
import { GetPlatformLogoUseCase } from './GetPlatformLogoUseCase';

class GetPlatformLogoController {
  constructor(private getPlatformLogoUseCase: GetPlatformLogoUseCase) {}

  async handle(req: Request, response: Response): Promise<void> {
    const { id: partnerID } = req.params;
    const companyLogoURL = await this.getPlatformLogoUseCase.execute(partnerID);
    request(
      {
        url: companyLogoURL,
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

export { GetPlatformLogoController };
