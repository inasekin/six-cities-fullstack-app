import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import typegoose, {getModelForClass, Ref}  from '@typegoose/typegoose';

import {Location} from '../../types/location.type.js';
import {CityEntity} from '../city/city.entity.js';
import {BuildingTypeEntity} from '../building-type/building-type.entity.js';
import {GoodEntity} from '../good/good.entity.js';
import {UserEntity} from '../user/user.entity.js';

const {modelOptions, prop} = typegoose;

export interface OfferEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends TimeStamps {
  @prop({trim: true, required: true})
  public title!: string;

  @prop({trim: true, required: true})
  public description!: string;

  @prop({required: true})
  public createdDate!: Date;

  @prop({ref: CityEntity, required: true})
  public city!: Ref<CityEntity>;

  @prop({required: true})
  public previewImage!: string;

  @prop({required: true})
  public images!: string[];

  @prop({required: true, default: false})
  public isPremium!: boolean;

  @prop({required: true, default: 0})
  public rating!: number;

  @prop({ref: BuildingTypeEntity, required: true})
  public type!: Ref<BuildingTypeEntity>;

  @prop({required: true, default: 0})
  public bedrooms!: number;

  @prop({required: true, default: 0})
  public maxAdults!: number;

  @prop({required: true})
  public price!: number;

  @prop({
    ref: GoodEntity,
    required: true,
    _id: false,
  })
  public goods!: Ref<GoodEntity>[];

  @prop({ref: UserEntity, required: true})
  public host!: Ref<UserEntity>;

  @prop({default: 0})
  public commentCount!: number;

  @prop({required: true})
  public location!: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
