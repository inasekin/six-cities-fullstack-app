import {NextFunction, Request, Response} from 'express';

import {MiddlewareInterface} from '../../types/middleware.interface.js';
import HttpError from '../errors/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {CheckOwnerInterface} from '../../types/check-owner.interface.js';

class CheckOwnerMiddleware implements MiddlewareInterface {
  constructor(
    private readonly service: CheckOwnerInterface,
    private readonly param: string
  ) {}

  public async execute({params}: Request, res: Response, next: NextFunction): Promise<void> {
    const {user} = res.locals;
    const documentId = params[this.param];

    if (!await this.service.isOwner(user.id, documentId)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Ошибка доступа.',
        'CheckOwnerMiddleware'
      );
    }

    next();
  }
}

export default CheckOwnerMiddleware;
