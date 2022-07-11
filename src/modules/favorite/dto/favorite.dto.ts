import {Expose, Type} from 'class-transformer';

import OfferDto from '../../offer/dto/offer.dto.js';

class FavoriteDto {
  @Expose()
  public id!: string;

  @Expose({name: 'offerId'})
  @Type(() => OfferDto)
  public offer!: OfferDto;
}

export default FavoriteDto;
