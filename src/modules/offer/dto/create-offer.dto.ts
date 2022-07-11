import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsDateString,
  IsMongoId,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested
} from 'class-validator';

import {Location} from '../../../types/location.type.js';
import {getValidateMessage} from '../../../utils/utils.js';
import ValidateTypeEnum from '../../../types/validate-type.enum.js';
import {
  ADULTS_MAX,
  ADULTS_MIN, DESCRIPTION_MAX_LENGTH, DESCRIPTION_MIN_LENGTH,
  IMAGE_MAX_COUNT,
  IMAGE_MIN_COUNT,
  PREVIEW_MIN_LENGTH, PRICE_MAX, PRICE_MIN, RATING_MAX, RATING_MIN, ROOMS_MAX, ROOMS_MIN,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH
} from '../../../common/constants.js';

class CreateOfferDto {
  @IsMongoId({message: getValidateMessage(ValidateTypeEnum.IsMongoId)})
  public city!: string;

  @MinLength(PREVIEW_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, PREVIEW_MIN_LENGTH)
  })
  public previewImage!: string;

  @ArrayMinSize(IMAGE_MIN_COUNT, {
    message: getValidateMessage(ValidateTypeEnum.ArrayMinSize, IMAGE_MIN_COUNT)
  })
  @ArrayMaxSize(IMAGE_MAX_COUNT, {
    message: getValidateMessage(ValidateTypeEnum.ArrayMaxSize, IMAGE_MAX_COUNT)
  })
  public images!: string[];

  @MinLength(TITLE_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, TITLE_MIN_LENGTH)
  })
  @MaxLength(TITLE_MAX_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.Maxlength, TITLE_MAX_LENGTH)
  })
  public title!: string;

  @IsBoolean({message: getValidateMessage(ValidateTypeEnum.IsBoolean)})
  public isPremium!: boolean;

  @Min(RATING_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, RATING_MIN)})
  @Max(RATING_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, RATING_MAX)})
  public rating!: number;

  @IsMongoId({message: getValidateMessage(ValidateTypeEnum.IsMongoId)})
  public type!: string;

  @Min(ROOMS_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, ROOMS_MIN)})
  @Max(ROOMS_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, ROOMS_MAX)})
  public bedrooms!: number;

  @Min(ADULTS_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, ADULTS_MIN)})
  @Max(ADULTS_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, ADULTS_MAX)})
  public maxAdults!: number;

  @Min(PRICE_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, PRICE_MIN)})
  @Max(PRICE_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, PRICE_MAX)})
  public price!: number;

  @IsMongoId({message: getValidateMessage(ValidateTypeEnum.IsMongoId), each: true})
  public goods!: string[];

  @MinLength(DESCRIPTION_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, DESCRIPTION_MIN_LENGTH)
  })
  @MaxLength(DESCRIPTION_MAX_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.Maxlength, DESCRIPTION_MAX_LENGTH)
  })
  public description!: string;

  @ValidateNested({message: getValidateMessage(ValidateTypeEnum.ValidateNested)})
  public location!: Location;

  @IsDateString({message: getValidateMessage(ValidateTypeEnum.IsDateString)})
  public createdDate!: Date;
}

export default CreateOfferDto;
