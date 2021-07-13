import { Response, Request } from 'express';
import path from 'path';

class ProvideLCCLogoController {
  handle(request: Request, response: Response): void {
    const options = {
      root: path.join('.', 'assets'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
      },
    };
    const fileName = 'logo.png';
    response.sendFile(fileName, options);
  }
}

export { ProvideLCCLogoController };
