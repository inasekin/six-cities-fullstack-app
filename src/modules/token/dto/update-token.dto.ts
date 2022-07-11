import {IsEmail, IsJWT} from 'class-validator';

import {getValidateMessage} from '../../../utils/utils.js';
import ValidateTypeEnum from '../../../types/validate-type.enum.js';

class UpdateTokenDto {
  @IsEmail({message: getValidateMessage(ValidateTypeEnum.IsEmail)})
  public email!: string;

  @IsJWT({message: getValidateMessage(ValidateTypeEnum.IsJWT)})
  public refreshToken!: string;
}

export default UpdateTokenDto;
