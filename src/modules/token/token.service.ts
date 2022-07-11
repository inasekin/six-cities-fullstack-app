import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {ModelType} from '@typegoose/typegoose/lib/types.js';
import {DocumentType} from '@typegoose/typegoose';

import {Component} from '../../types/component.types.js';
import {TokenServiceInterface} from './token-service.interface.js';
import {TokenEntity} from './token.entity.js';
import CreateTokenDto from './dto/create-token.dto.js';
import {createJWT, verifyToken} from '../../utils/utils.js';
import {JWT_ALGORITHM} from '../user/user.constant.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import Payload from '../../types/payload.js';

@injectable()
class TokenService implements TokenServiceInterface {
  constructor(
    @inject(Component.TokenModel) private readonly tokenModel: ModelType<TokenEntity>,
    @inject(Component.ConfigInterface) private readonly config: ConfigInterface
  ) {}

  public async create(dto: CreateTokenDto): Promise<DocumentType<TokenEntity>> {
    return this.tokenModel.create(dto);
  }

  public async generateTokens(payload: Payload): Promise<CreateTokenDto> {
    const token = await createJWT(
      JWT_ALGORITHM,
      this.config.get('JWT_SECRET'),
      payload,
      this.config.get('TOKEN_EXPIRATION_TIME')
    );

    const refreshToken = await createJWT(
      JWT_ALGORITHM,
      this.config.get('JWT_REFRESH_SECRET'),
      payload
    );

    return {token, refreshToken};
  }

  public async updateTokens(refreshToken: string): Promise<CreateTokenDto | null> {
    try {
      const payload = await verifyToken(refreshToken, this.config.get('JWT_REFRESH_SECRET'));
      const result = await this.findByRefreshToken(refreshToken);

      if (!result) {
        return null;
      }

      return this.generateTokens(payload);
    } catch {

      return null;
    }
  }

  public async findByToken(token: string): Promise<DocumentType<TokenEntity> | null> {
    return this.tokenModel.findOne({token});
  }

  public async findByRefreshToken(refreshToken: string): Promise<DocumentType<TokenEntity> | null> {
    return this.tokenModel.findOne({refreshToken});
  }

  public async deleteByToken(token: string): Promise<void | null> {
    return this.tokenModel.findOneAndDelete({token});
  }

  public async deleteByRefreshToken(refreshToken: string): Promise<void | null> {
    return this.tokenModel.findOneAndDelete({refreshToken});
  }
}

export default TokenService;
