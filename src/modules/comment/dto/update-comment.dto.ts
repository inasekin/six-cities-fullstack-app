import {IsOptional, Max, MaxLength, Min, MinLength} from 'class-validator';

import {getValidateMessage} from '../../../utils/utils.js';
import ValidateTypeEnum from '../../../types/validate-type.enum.js';
import {COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH, RATING_MAX, RATING_MIN} from '../../../common/constants.js';

class UpdateCommentDto {
  @IsOptional()
  @MinLength(COMMENT_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, COMMENT_MIN_LENGTH)
  })
  @MaxLength(COMMENT_MAX_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.Maxlength, COMMENT_MAX_LENGTH)
  })
  public text!: string;

  @IsOptional()
  @Min(RATING_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, RATING_MIN)})
  @Max(RATING_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, RATING_MAX)})
  public rating!: number;
}

export default UpdateCommentDto;
