import {IsBoolean, IsEmail, IsOptional, MaxLength, MinLength} from 'class-validator';

import {getValidateMessage} from '../../../utils/utils.js';
import ValidateTypeEnum from '../../../types/validate-type.enum.js';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PREVIEW_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH
} from '../../../common/constants.js';

export default class CreateUserDto {
  @IsEmail({message: getValidateMessage(ValidateTypeEnum.IsEmail)})
  public email!: string;

  @IsOptional()
  @MinLength(PREVIEW_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, PREVIEW_MIN_LENGTH)
  })
  public avatarUrl?: string;

  @MinLength(TITLE_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, TITLE_MIN_LENGTH)
  })
  @MaxLength(TITLE_MAX_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.Maxlength, TITLE_MAX_LENGTH)
  })
  public name!: string;

  @IsBoolean({message: getValidateMessage(ValidateTypeEnum.IsBoolean)})
  public isPro!: boolean;

  @MinLength(PASSWORD_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, PASSWORD_MIN_LENGTH)
  })
  @MaxLength(PASSWORD_MAX_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.Maxlength, PASSWORD_MAX_LENGTH)
  })
  public password!: string;
}
