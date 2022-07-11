import 'reflect-metadata';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {inject, injectable} from 'inversify';

import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {CityServiceInterface} from './city-service.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {fillDTO} from '../../utils/utils.js';
import HttpError from '../../common/errors/http-error.js';
import CreateCityDto from './dto/create-city.dto.js';
import CityDto from './dto/city.dto.js';
import ValidateDtoMiddleware from '../../common/middlewares/validate-dto.middleware.js';
import PrivateRouteMiddleware from '../../common/middlewares/private-route.middleware.js';

@injectable()
export default class CityController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CityServiceInterface) private readonly cityService: CityServiceInterface
  ) {
    super(logger);

    this.logger.info('Добавление роутов для городов...');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCityDto)
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    this.ok(res, fillDTO(CityDto, await this.cityService.find()));
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCityDto>, res: Response) {
    const city = await this.cityService.findByName(body.name);

    if (city) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Город ${body.name} уже существует.`,
        'CityController',
      );
    }

    const result = await this.cityService.create(body);

    this.created(res, fillDTO(CityDto, result));
  }
}
