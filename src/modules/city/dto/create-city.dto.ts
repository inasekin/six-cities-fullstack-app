import {Max, MaxLength, Min, MinLength} from 'class-validator';
import {
  LATITUDE_MAX,
  LATITUDE_MIN,
  LONGITUDE_MAX,
  LONGITUDE_MIN,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH
} from '../../../common/constants.js';
import {getValidateMessage} from '../../../utils/utils.js';
import ValidateTypeEnum from '../../../types/validate-type.enum.js';

class CreateCityDto {
  @MinLength(TITLE_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, TITLE_MIN_LENGTH)
  })
  @MaxLength(TITLE_MAX_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.Maxlength, TITLE_MAX_LENGTH)
  })

  public name!: string;

  @Min(LATITUDE_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, LATITUDE_MIN)})
  @Max(LATITUDE_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, LATITUDE_MAX)})

  public latitude!: number;

  @Min(LONGITUDE_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, LONGITUDE_MIN)})
  @Max(LONGITUDE_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, LONGITUDE_MAX)})

  public longitude!: number;
}

export default CreateCityDto;
