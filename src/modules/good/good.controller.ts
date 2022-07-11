import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {GoodServiceInterface} from './good-service.interface.js';
import {fillDTO} from '../../utils/utils.js';
import HttpError from '../../common/errors/http-error.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import GoodDto from './dto/good.dto.js';
import CreateGoodDto from './dto/create-good.dto.js';
import ValidateDtoMiddleware from '../../common/middlewares/validate-dto.middleware.js';
import PrivateRouteMiddleware from '../../common/middlewares/private-route.middleware.js';

@injectable()
export default class GoodController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.GoodServiceInterface) private readonly goodService: GoodServiceInterface
  ) {
    super(logger);

    this.logger.info('Добавление роутов для удобств...');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateGoodDto)
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    this.ok(res, fillDTO(GoodDto, await this.goodService.find()));
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateGoodDto>, res: Response) {
    const good = await this.goodService.findByName(body.name);

    if (good) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Удобство ${body.name} уже существует.`,
        'GoodController',
      );
    }

    const result = await this.goodService.create(body);

    this.created(res, fillDTO(GoodDto, result));
  }
}
