import {Expose} from 'class-transformer';

class CreateTokenDto {
  @Expose()
  public token!: string;

  @Expose()
  public refreshToken!: string;
}

export default CreateTokenDto;
