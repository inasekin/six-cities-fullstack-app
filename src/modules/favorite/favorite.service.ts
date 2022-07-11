import {inject, injectable} from 'inversify';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {DocumentType} from '@typegoose/typegoose';

import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {FavoriteEntity} from './favorite.entity.js';
import {FavoriteServiceInterface} from './favorite-service.interface.js';
import CreateFavoriteDto from './dto/create-favorite.dto.js';

@injectable()
class FavoriteService implements FavoriteServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.FavoriteModel) private readonly favoriteModel: ModelType<FavoriteEntity>
  ) {}

  public async create(dto: CreateFavoriteDto, userId: string): Promise<DocumentType<FavoriteEntity>> {
    const result = await this.favoriteModel.create({...dto, userId: userId});

    this.logger.info(`Предложение с id: ${result.offerId} добавлено в избранное`);

    return result;
  }

  public async findByUserId(id: string): Promise<DocumentType<FavoriteEntity>[]> {
    return this.favoriteModel.find({userId: id}).populate('offerId').exec();
  }

  public async deleteById(id: string): Promise<void | null> {
    return this.favoriteModel.findByIdAndDelete(id);
  }

  public async isAdded(offerId: string, userId: string): Promise<boolean> {
    return (await this.favoriteModel.exists({offerId, userId}) !== null);
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.favoriteModel.exists({_id: documentId}) !== null);
  }
}

export default FavoriteService;
