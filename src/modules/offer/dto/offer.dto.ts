import {Expose, Type} from 'class-transformer';

import BuildingTypeDto from '../../building-type/dto/building-type.dto.js';
import CityDto from '../../city/dto/city.dto.js';
import GoodDto from '../../good/dto/good.dto.js';
import {Location} from '../../../types/location.type.js';
import UserDto from '../../user/dto/user.dto.js';

class OfferDto {
  @Expose()
  public id!: string;

  @Expose()
  @Type(() => CityDto)
  public city!: CityDto;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public title!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  @Type(() => BuildingTypeDto)
  public type!: BuildingTypeDto;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public price!: number;

  @Expose()
  @Type(() => GoodDto)
  public goods!: GoodDto[];

  @Expose()
  @Type(() => UserDto)
  public host!: UserDto;

  @Expose()
  public description!: string;

  @Expose()
  public location!: Location;

  @Expose()
  public createdDate!: Date;

  @Expose()
  public commentCount!: number;
}

export default OfferDto;
