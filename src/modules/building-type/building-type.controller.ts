import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {StatusCodes} from 'http-status-codes';
import {Request, Response} from 'express';

import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {BuildingTypeServiceInterface} from './building-type-service.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {fillDTO} from '../../utils/utils.js';
import BuildingTypeDto from './dto/building-type.dto.js';
import CreateBuildingTypeDto from './dto/create-building-type.dto.js';
import HttpError from '../../common/errors/http-error.js';
import ValidateDtoMiddleware from '../../common/middlewares/validate-dto.middleware.js';
import PrivateRouteMiddleware from '../../common/middlewares/private-route.middleware.js';

@injectable()
class BuildingTypeController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.BuildingTypeServiceInterface) private readonly buildingTypeService: BuildingTypeServiceInterface
  ) {
    super(logger);

    this.logger.info('Добавление роутов для типов жилья...');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateBuildingTypeDto)
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    this.ok(res, fillDTO(BuildingTypeDto, await this.buildingTypeService.find()));
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateBuildingTypeDto>, res: Response) {
    const buildingType = await this.buildingTypeService.findByName(body.name);

    if (buildingType) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Тип жилья ${body.name} уже существует.`,
        'BuildingTypeController',
      );
    }

    const result = await this.buildingTypeService.create(body);

    this.created(res, fillDTO(BuildingTypeDto, result));
  }
}

export default BuildingTypeController;
