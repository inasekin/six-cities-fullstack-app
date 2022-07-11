import {DocumentType} from '@typegoose/typegoose';

import CreateTokenDto from './dto/create-token.dto.js';
import {TokenEntity} from './token.entity.js';
import Payload from '../../types/payload.js';

interface TokenServiceInterface {
  create(dto: CreateTokenDto): Promise<DocumentType<TokenEntity>>;
  generateTokens(payload: Payload): Promise<CreateTokenDto>;
  updateTokens(refreshToken: string): Promise<CreateTokenDto | null>;
  findByToken(token: string): Promise<DocumentType<TokenEntity> | null>;
  findByRefreshToken(refreshToken: string): Promise<DocumentType<TokenEntity> | null>;
  deleteByToken(token: string): Promise<void | null>;
  deleteByRefreshToken(refreshToken: string): Promise<void | null>;
}

export {TokenServiceInterface};
