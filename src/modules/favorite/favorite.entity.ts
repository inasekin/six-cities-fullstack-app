import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import typegoose, {getModelForClass, Ref} from '@typegoose/typegoose';

import {OfferEntity} from '../offer/offer.entity.js';
import {UserEntity} from '../user/user.entity.js';

const {ModelOptions, prop} = typegoose;

export interface FavoriteEntity extends Base {}

@ModelOptions({
  schemaOptions: {
    collection: 'favorites'
  }
})
export class FavoriteEntity extends TimeStamps {
  @prop({ref: OfferEntity, required: true})
  public offerId!: Ref<OfferEntity>;

  @prop({ref: UserEntity, required: true})
  public userId!: Ref<UserEntity>;
}

export const FavoriteModel = getModelForClass(FavoriteEntity);
