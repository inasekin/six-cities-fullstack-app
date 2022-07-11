import {StatusCodes} from 'http-status-codes';
import {NextFunction, Request, Response} from 'express';

import {MiddlewareInterface} from '../../types/middleware.interface.js';
import HttpError from '../errors/http-error.js';

class PrivateRouteMiddleware implements MiddlewareInterface {
  public async execute(_req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!res.locals.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Пользователь не авторизован',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}

export default PrivateRouteMiddleware;
