import {Expose} from 'class-transformer';

class LoggedUserDto {
  @Expose()
  public token!: string;

  @Expose()
  public refreshToken!: string;

  @Expose()
  public email!: string;
}

export default LoggedUserDto;
