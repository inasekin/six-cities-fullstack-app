import 'reflect-metadata';
import cors from 'cors';
import {inject, injectable} from 'inversify';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {Component} from '../types/component.types.js';
import {getURI} from '../utils/db.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import express, {Express} from 'express';
import {ExceptionFilterInterface} from '../common/errors/exception-filter.interface.js';
import {ControllerInterface} from '../common/controller/controller.interface.js';
import {TokenServiceInterface} from '../modules/token/token-service.interface.js';
import AuthenticateMiddleware from '../common/middlewares/authenticate.middleware.js';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,
    @inject(Component.OfferController) private offerController: ControllerInterface,
    @inject(Component.BuildingTypeController) private buildingTypeController: ControllerInterface,
    @inject(Component.CityController) private cityController: ControllerInterface,
    @inject(Component.GoodController) private goodController: ControllerInterface,
    @inject(Component.UserController) private userController: ControllerInterface,
    @inject(Component.FavoriteController) private favoriteController: ControllerInterface,
    @inject(Component.TokenServiceInterface) private tokenService: TokenServiceInterface
  ) {
    this.expressApp = express();
  }

  public registerRoutes() {
    this.expressApp.use('/offers', this.offerController.router);
    this.expressApp.use('/buildingtypes', this.buildingTypeController.router);
    this.expressApp.use('/cities', this.cityController.router);
    this.expressApp.use('/goods', this.goodController.router);
    this.expressApp.use('/users', this.userController.router);
    this.expressApp.use('/favorites', this.favoriteController.router);
  }


  public registerMiddlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIR'))
    );

    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'), this.tokenService);
    this.expressApp.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.expressApp.use(cors());
  }

  public registerExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const dbUser = this.config.get('DB_USER');
    const port = this.config.get('PORT');

    const uri = getURI(
      dbUser,
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
      {
        authSource: dbUser
      }
    );

    this.logger.info(uri);

    await this.databaseClient.connect(uri);

    this.registerMiddlewares();
    this.registerRoutes();
    this.registerExceptionFilters();
    this.expressApp.listen(port);
    this.logger.info(`The server started on ${this.config.get('HOST')}:${port}`);
    this.logger.info('Application initialization complete.');
  }
}
