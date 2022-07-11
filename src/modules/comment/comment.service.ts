import {inject, injectable} from 'inversify';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {DocumentType} from '@typegoose/typegoose';

import {CommentServiceInterface} from './comment-service.interface.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {CommentEntity} from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import UpdateCommentDto from './dto/update-comment.dto.js';
import {OfferServiceInterface} from '../offer/offer-service.interface.js';

@injectable()
class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: ModelType<CommentEntity>,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface
  ) {}

  public async create(dto: CreateCommentDto, userId: string, offerId: string): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create({...dto, userId, offerId});

    await this.offerService.incCommentCount(offerId);
    this.logger.info(`Добавлен новый комментарий с id: ${offerId} к посту с id: ${userId}`);

    return result;
  }

  public async findByOfferId(id: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({offerId: id}).populate('userId').exec();
  }

  public async updateById(id: string, dto: UpdateCommentDto): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel.findByIdAndUpdate(id, dto, {new: true}).populate('userId').exec();
  }

  public async deleteById(id: string): Promise<void | null> {
    await this.commentModel.findByIdAndDelete(id);
    await this.offerService.decCommentCount(id);
  }

  public async deleteByOfferId(id: string): Promise<void | null> {
    await this.commentModel.deleteMany({offerId: id});
  }

  public async isOwner(userId: string, documentId: string): Promise<boolean> {
    return (await this.commentModel.find({userId, offerId: documentId}) !== null);
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.commentModel.exists({_id: documentId}) !== null);
  }
}

export default CommentService;
