import {Expose} from 'class-transformer';

class GoodDto {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;
}

export default GoodDto;
