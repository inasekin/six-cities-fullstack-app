import {IsMongoId} from 'class-validator';

import {getValidateMessage} from '../../../utils/utils.js';
import ValidateTypeEnum from '../../../types/validate-type.enum.js';

class CreateFavoriteDto {
  @IsMongoId({message: getValidateMessage(ValidateTypeEnum.IsMongoId)})
  public offerId!: string;
}

export default CreateFavoriteDto;
