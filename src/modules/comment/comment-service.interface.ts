import {DocumentType} from '@typegoose/typegoose';

import {CommentEntity} from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import UpdateCommentDto from './dto/update-comment.dto.js';
import {DocumentExistsInterface} from '../../types/document-exists.interface.js';
import {CheckOwnerInterface} from '../../types/check-owner.interface.js';

interface CommentServiceInterface extends DocumentExistsInterface, CheckOwnerInterface {
  create(dto: CreateCommentDto, userId: string, offerId: string): Promise<DocumentType<CommentEntity>>;
  findByOfferId(id: string): Promise<DocumentType<CommentEntity>[]>;
  updateById(id: string, dto: UpdateCommentDto): Promise<DocumentType<CommentEntity> | null>;
  deleteById(id: string): Promise<void | null>;
  deleteByOfferId(id: string): Promise<void | null>;
}

export {CommentServiceInterface};
