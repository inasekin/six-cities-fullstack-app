import 'reflect-metadata';
import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';

import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {OfferServiceInterface} from './offer-service.interface.js';
import {Controller} from '../../common/controller/controller.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import {fillDTO} from '../../utils/utils.js';
import OfferDto from './dto/offer.dto.js';
import ValidateObjectIdMiddleware from '../../common/middlewares/validate-objectid.middleware.js';
import ValidateDtoMiddleware from '../../common/middlewares/validate-dto.middleware.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import {CommentServiceInterface} from '../comment/comment-service.interface.js';
import CommentDto from '../comment/dto/comment.dto.js';
import DocumentExistsMiddleware from '../../common/middlewares/document-exists.middleware.js';
import PrivateRouteMiddleware from '../../common/middlewares/private-route.middleware.js';
import CheckOwnerMiddleware from '../../common/middlewares/check-owner.middleware.js';

const ENTITY_OFFER_NAME = 'Предложение';
const ENTITY_COMMENT_NAME = 'Комментарий';
const PARAM_OFFER_ID = 'offerId';
const PARAM_COMMENT_ID = 'commentId';

@injectable()
class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Добавление роутов для предложений...');
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: `/:${PARAM_OFFER_ID}`,
      method: HttpMethod.Get,
      handler: this.getOfferById,
      middlewares: [
        new ValidateObjectIdMiddleware(PARAM_OFFER_ID),
        new DocumentExistsMiddleware(this.offerService, ENTITY_OFFER_NAME, PARAM_OFFER_ID)
      ]
    });
    this.addRoute({path: '/premium', method: HttpMethod.Get, handler: this.getPremium});
    this.addRoute({
      path: `/:${PARAM_OFFER_ID}`,
      method: HttpMethod.Patch,
      handler: this.updateOfferById,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(PARAM_OFFER_ID),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, ENTITY_OFFER_NAME, PARAM_OFFER_ID),
        new CheckOwnerMiddleware(this.offerService, PARAM_OFFER_ID),
      ]
    });
    this.addRoute({
      path: `/:${PARAM_OFFER_ID}`,
      method: HttpMethod.Delete,
      handler: this.deleteOfferById,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(PARAM_OFFER_ID),
        new DocumentExistsMiddleware(this.offerService, ENTITY_OFFER_NAME, PARAM_OFFER_ID),
        new CheckOwnerMiddleware(this.offerService, PARAM_OFFER_ID),
      ]
    });

    this.logger.info('Добавление роутов для комментариев...');
    this.addRoute({
      path: `/:${PARAM_OFFER_ID}/comments`,
      method: HttpMethod.Post,
      handler: this.addComment,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(PARAM_OFFER_ID),
        new DocumentExistsMiddleware(this.offerService, ENTITY_OFFER_NAME, PARAM_OFFER_ID)
      ]
    });
    this.addRoute({
      path: `/:${PARAM_OFFER_ID}/comments`,
      method: HttpMethod.Get,
      handler: this.getOfferComments,
      middlewares: [
        new ValidateObjectIdMiddleware(PARAM_OFFER_ID),
        new DocumentExistsMiddleware(this.offerService, ENTITY_OFFER_NAME, PARAM_OFFER_ID)
      ]
    });
    this.addRoute({
      path: `/:${PARAM_OFFER_ID}/comments/:${PARAM_COMMENT_ID}`,
      method: HttpMethod.Patch,
      handler: this.updateComment,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(PARAM_OFFER_ID),
        new ValidateObjectIdMiddleware(PARAM_COMMENT_ID),
        new DocumentExistsMiddleware(this.offerService, ENTITY_OFFER_NAME, PARAM_OFFER_ID),
        new DocumentExistsMiddleware(this.commentService, ENTITY_COMMENT_NAME, PARAM_COMMENT_ID),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new CheckOwnerMiddleware(this.commentService, PARAM_COMMENT_ID),
      ]
    });
    this.addRoute({
      path: `/:${PARAM_OFFER_ID}/comments/:${PARAM_COMMENT_ID}`,
      method: HttpMethod.Delete,
      handler: this.deleteComment,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware(PARAM_OFFER_ID),
        new ValidateObjectIdMiddleware(PARAM_COMMENT_ID),
        new DocumentExistsMiddleware(this.offerService, ENTITY_OFFER_NAME, PARAM_OFFER_ID),
        new DocumentExistsMiddleware(this.commentService, ENTITY_COMMENT_NAME, PARAM_COMMENT_ID),
        new CheckOwnerMiddleware(this.commentService, PARAM_COMMENT_ID),
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const result = await this.offerService.find(res.locals?.user?.id || '');
    console.log(result);
    this.ok(res, fillDTO(OfferDto, result));
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response): Promise<void> {

    const result = this.offerService.create(body, res.locals.user.id);

    this.created(res, fillDTO(OfferDto, result));
  }

  public async getOfferById({params}: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);

    this.ok(res, fillDTO(OfferDto, offer));
  }

  public async getPremium(_req: Request, res: Response): Promise<void> {
    const premiumOffers = await this.offerService.findPremium();

    this.ok(res, fillDTO(OfferDto, premiumOffers));
  }

  public async updateOfferById({params, body}: Request, res: Response): Promise<void> {
    const offer = await this.offerService.updateById(params.offerId, body);

    this.ok(res, fillDTO(OfferDto, offer));
  }

  public async deleteOfferById({params}: Request, res: Response): Promise<void> {
    const {offerId} = params;

    await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res);
  }

  public async addComment({params, body}: Request, res: Response): Promise<void> {
    const result = await this.commentService.create(body, res.locals.user.id, params.offerId);

    this.created(res, fillDTO(CommentDto, result));
  }

  public async getOfferComments({params}: Request, res: Response): Promise<void> {
    const result = await this.commentService.findByOfferId(params.offerId);

    this.ok(res, fillDTO(CommentDto, result));
  }

  public async updateComment({params, body}: Request, res: Response): Promise<void> {
    const result = await this.commentService.updateById(params.commentId, body);

    this.ok(res, fillDTO(CommentDto, result));
  }

  public async deleteComment({params}: Request, res: Response): Promise<void> {
    await this.commentService.deleteById(params.commentId);

    this.noContent(res);
  }
}

export default OfferController;
