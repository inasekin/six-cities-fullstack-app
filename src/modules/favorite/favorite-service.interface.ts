import {DocumentType} from '@typegoose/typegoose';

import {DocumentExistsInterface} from '../../types/document-exists.interface.js';
import {FavoriteEntity} from './favorite.entity.js';
import CreateFavoriteDto from './dto/create-favorite.dto.js';

interface FavoriteServiceInterface extends DocumentExistsInterface{
  create(dto: CreateFavoriteDto, userId: string): Promise<DocumentType<FavoriteEntity>>;
  findByUserId(id: string): Promise<DocumentType<FavoriteEntity>[]>;
  deleteById(id: string): Promise<void | null>;
  isAdded(offerId: string, userId: string): Promise<boolean>;
}

export {FavoriteServiceInterface};
