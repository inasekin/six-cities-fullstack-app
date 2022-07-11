import 'reflect-metadata';
import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';

import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {fillDTO} from '../../utils/utils.js';
import ValidateDtoMiddleware from '../../common/middlewares/validate-dto.middleware.js';
import {FavoriteServiceInterface} from './favorite-service.interface.js';
import CreateFavoriteDto from './dto/create-favorite.dto.js';
import FavoriteDto from './dto/favorite.dto.js';
import ValidateObjectIdMiddleware from '../../common/middlewares/validate-objectid.middleware.js';
import DocumentExistsMiddleware from '../../common/middlewares/document-exists.middleware.js';
import PrivateRouteMiddleware from '../../common/middlewares/private-route.middleware.js';
import HttpError from '../../common/errors/http-error.js';
import {StatusCodes} from 'http-status-codes';

const PARAM_FAVORITE_ID = 'favoriteId';
const ENTITY_NAME = 'Избранное';

@injectable()
class FavoriteController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FavoriteServiceInterface) private readonly favoriteService: FavoriteServiceInterface
  ) {
    super(logger);

    this.logger.info('Добавление роутов для избранного...');
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateFavoriteDto)
      ]
    });
    this.addRoute({
      path: `/:${PARAM_FAVORITE_ID}`,
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(PARAM_FAVORITE_ID),
        new DocumentExistsMiddleware(this.favoriteService, ENTITY_NAME, PARAM_FAVORITE_ID)
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const result = await this.favoriteService.findByUserId(res.locals.user.id);

    this.ok(res, fillDTO(FavoriteDto, result));
  }

  public async create({body}: Request<Record<string, string>, Record<string, unknown>, CreateFavoriteDto>,
    res: Response): Promise<void> {
    const userId = res.locals.user.id;
    const isAdded = await this.favoriteService.isAdded(body.offerId, userId);

    if (isAdded) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Предложение c id: ${body.offerId} уже добавлено в избранное.`,
        'FavoriteController',
      );
    }

    const result = await this.favoriteService.create(body, userId);

    this.logger.info(`Предложение с id: ${result.offerId}`);

    this.created(res, fillDTO(FavoriteDto, result));
  }

  public async delete({params}: Request, res: Response): Promise<void> {
    await this.favoriteService.deleteById(params[PARAM_FAVORITE_ID]);

    this.noContent(res);
  }
}

export default FavoriteController;
