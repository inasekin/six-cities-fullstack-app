import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {UserServiceInterface} from './user-service.interface.js';
import {fillDTO} from '../../utils/utils.js';
import HttpError from '../../common/errors/http-error.js';
import CreateUserDto from './dto/create-user.dto.js';
import UserDto from './dto/user.dto.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import ValidateDtoMiddleware from '../../common/middlewares/validate-dto.middleware.js';
import ValidateObjectIdMiddleware from '../../common/middlewares/validate-objectid.middleware.js';
import UploadFileMiddleware from '../../common/middlewares/upload-file.middleware.js';
import LoginUserDto from './dto/login-user.dto.js';
import LoggedUserDto from './dto/logged-user.dto.js';
import {TokenServiceInterface} from '../token/token-service.interface.js';
import PrivateRouteMiddleware from '../../common/middlewares/private-route.middleware.js';
import UpdateTokenDto from '../token/dto/update-token.dto.js';

@injectable()
class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.TokenServiceInterface) private readonly tokenService: TokenServiceInterface,
    @inject(Component.ConfigInterface) private readonly config: ConfigInterface
  ) {
    super(logger);

    this.logger.info('Добавление роутов для пользователей...');
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [new PrivateRouteMiddleware()]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.register,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute({
      path: '/refresh',
      method: HttpMethod.Post,
      handler: this.refreshTokens,
      middlewares: [new ValidateDtoMiddleware(UpdateTokenDto)]
    });
    this.addRoute({
      path: '/logout',
      method: HttpMethod.Post,
      handler: this.logout,
      middlewares: [new ValidateDtoMiddleware(UpdateTokenDto)]
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIR'), 'avatar')
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    this.ok(res, fillDTO(UserDto, res.locals.user));
  }

  public async register({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>, res: Response) {
    const user = await this.userService.findByEmail(body.email);

    if (user) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Пользователь с email: ${body.email} уже существует.`,
        'UserController',
      );
    }

    const result = await this.userService.create(body, this.config.get('SALT'));

    this.created(res, fillDTO(UserDto, result));
  }

  public async login({body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    res: Response): Promise<void> {
    const user = await this.userService.verifyUser(body);

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Не прошли авторизацию',
        'UserController'
      );
    }

    const tokens = await this.tokenService.generateTokens({id: user.id, email: user.email});

    await this.tokenService.create(tokens);

    this.ok(res, fillDTO(LoggedUserDto, {...tokens, email: user.email}));
  }

  public async refreshTokens({body}: Request<Record<string, unknown>, UpdateTokenDto>, res: Response) {
    const tokens = await this.tokenService.updateTokens(body.refreshToken);

    if (!tokens) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Неудачная попытка обновления токена',
        'UserController'
      );
    }

    await this.tokenService.deleteByRefreshToken(body.refreshToken);
    await this.tokenService.create(tokens);

    this.ok(res, fillDTO(LoggedUserDto, {...tokens, email: body.email}));
  }

  public async logout({body}: Request<Record<string, unknown>, UpdateTokenDto>, res: Response) {
    await this.tokenService.deleteByRefreshToken(body.refreshToken);

    this.noContent(res);
  }

  public async uploadAvatar({file}: Request, res: Response) {
    const result = await this.userService.updateById(res.locals.user.id, {avatarUrl: file?.path});

    this.created(res, fillDTO(UserDto, result));
  }
}

export default UserController;
