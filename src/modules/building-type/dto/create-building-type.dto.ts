import {MaxLength, MinLength} from 'class-validator';

import {TITLE_MAX_LENGTH, TITLE_MIN_LENGTH} from '../../../common/constants.js';
import {getValidateMessage} from '../../../utils/utils.js';
import ValidateTypeEnum from '../../../types/validate-type.enum.js';

class CreateBuildingTypeDto {
  @MinLength(TITLE_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, TITLE_MIN_LENGTH)
  })
  @MaxLength(TITLE_MAX_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.Maxlength, TITLE_MAX_LENGTH)
  })
  public name!: string;
}

export default CreateBuildingTypeDto;
