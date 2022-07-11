import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import typegoose, {getModelForClass, Ref} from '@typegoose/typegoose';

import {UserEntity} from '../user/user.entity.js';
import {OfferEntity} from '../offer/offer.entity.js';

const {ModelOptions, prop} = typegoose;

export interface CommentEntity extends Base {}

@ModelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends TimeStamps {
  @prop({required: true})
  public text!: string;

  @prop({default: 0})
  public rating!: number;

  @prop({ref: OfferEntity, required: true})
  public offerId!: Ref<OfferEntity>;

  @prop({ref: UserEntity, required: true})
  public userId!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
