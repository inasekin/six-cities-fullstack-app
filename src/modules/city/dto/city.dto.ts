import {Expose} from 'class-transformer';

import {Location} from '../../../types/location.type.js';

class CityDto {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public location!: Location;
}

export default CityDto;
