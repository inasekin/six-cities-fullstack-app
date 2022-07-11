import {Expose} from 'class-transformer';

class BuildingTypeDto {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;
}

export default BuildingTypeDto;
