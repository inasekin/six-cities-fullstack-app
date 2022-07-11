import {MaxLength, MinLength} from 'class-validator';

import {getValidateMessage} from '../../../utils/utils.js';
import ValidateTypeEnum from '../../../types/validate-type.enum.js';
import {COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH} from '../../../common/constants.js';

class CreateCommentDto {
  @MinLength(COMMENT_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, COMMENT_MIN_LENGTH)
  })
  @MaxLength(COMMENT_MAX_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.Maxlength, COMMENT_MAX_LENGTH)
  })
  public text!: string;
}

export default CreateCommentDto;
