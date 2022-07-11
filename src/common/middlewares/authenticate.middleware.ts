import {NextFunction, Request, Response} from 'express';

import {MiddlewareInterface} from '../../types/middleware.interface.js';
import {TokenServiceInterface} from '../../modules/token/token-service.interface.js';
import {verifyToken} from '../../utils/utils.js';

class AuthenticateMiddleware implements MiddlewareInterface {
  constructor(
    private readonly jwtSecret: string,
    private readonly tokenService: TokenServiceInterface) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = req.headers?.authorization?.split(' ');

    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const payload = await verifyToken(token, this.jwtSecret);
      const result = await this.tokenService.findByToken(token);

      if (result) {
        res.locals.user = {id: payload.id as string, email: payload.email as string};
      }

      return next();
    } catch {

      return next();
    }
  }
}

export default AuthenticateMiddleware;
