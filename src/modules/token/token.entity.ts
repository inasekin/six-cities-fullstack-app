import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import typegoose, {getModelForClass}  from '@typegoose/typegoose';

const {modelOptions, prop} = typegoose;

export interface TokenEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: 'tokens'
  }
})
export class TokenEntity extends TimeStamps {
  @prop({required: true})
  public token!: string;

  @prop({required: true})
  public refreshToken!: string;
}

export const TokenModel = getModelForClass(TokenEntity);
