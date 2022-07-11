import {Expose, Type} from 'class-transformer';
import UserDto from '../../user/dto/user.dto.js';

class CommentDto {
  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose({name: 'createdAt'})
  public createdDate!: Date;

  @Expose({name: 'userId'})
  @Type(() => UserDto)
  public user!: UserDto;
}

export default CommentDto;
