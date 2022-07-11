import {Expose} from 'class-transformer';

class UserDto {
  @Expose()
  public id!: string;

  @Expose()
  public email!: string;

  @Expose()
  public name!: string;

  @Expose()
  public avatarUrl!: string;

  @Expose()
  public isPro!: boolean;
}

export default UserDto;
