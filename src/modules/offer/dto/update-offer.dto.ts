import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsMongoId,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength, ValidateNested
} from 'class-validator';

import {getValidateMessage} from '../../../utils/utils.js';
import {Location} from '../../../types/location.type.js';
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

class UpdateOfferDto {
  @IsOptional()
  @IsMongoId({message: getValidateMessage(ValidateTypeEnum.IsMongoId)})
  public city?: string;

  @IsOptional()
  @MinLength(PREVIEW_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, PREVIEW_MIN_LENGTH)
  })
  public previewImage?: string;

  @IsOptional()
  @ArrayMinSize(IMAGE_MIN_COUNT, {
    message: getValidateMessage(ValidateTypeEnum.ArrayMinSize, IMAGE_MIN_COUNT)
  })
  @ArrayMaxSize(IMAGE_MAX_COUNT, {
    message: getValidateMessage(ValidateTypeEnum.ArrayMaxSize, IMAGE_MAX_COUNT)
  })
  public images?: string[];

  @IsOptional()
  @MinLength(TITLE_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, TITLE_MIN_LENGTH)
  })
  @MaxLength(TITLE_MAX_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.Maxlength, TITLE_MAX_LENGTH)
  })
  public title?: string;

  @IsOptional()
  @IsBoolean({message: getValidateMessage(ValidateTypeEnum.IsBoolean)})
  public isPremium?: boolean;

  @IsOptional()
  @Min(RATING_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, RATING_MIN)})
  @Max(RATING_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, RATING_MAX)})
  public rating?: number;

  @IsOptional()
  @IsMongoId({message: getValidateMessage(ValidateTypeEnum.IsMongoId)})
  public type?: string;

  @IsOptional()
  @Min(ROOMS_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, ROOMS_MIN)})
  @Max(ROOMS_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, ROOMS_MAX)})
  public bedrooms?: number;

  @IsOptional()
  @Min(ADULTS_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, ADULTS_MIN)})
  @Max(ADULTS_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, ADULTS_MAX)})
  public maxAdults?: number;

  @IsOptional()
  @Min(PRICE_MIN, {message: getValidateMessage(ValidateTypeEnum.Min, PRICE_MIN)})
  @Max(PRICE_MAX, {message: getValidateMessage(ValidateTypeEnum.Max, PRICE_MAX)})
  public price?: number;

  @IsOptional()
  @IsMongoId({message: getValidateMessage(ValidateTypeEnum.IsMongoId), each: true})
  public goods?: string[];

  @IsOptional()
  @MinLength(DESCRIPTION_MIN_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.MinLength, DESCRIPTION_MIN_LENGTH)
  })
  @MaxLength(DESCRIPTION_MAX_LENGTH, {
    message: getValidateMessage(ValidateTypeEnum.Maxlength, DESCRIPTION_MAX_LENGTH)
  })
  public description?: string;

  @IsOptional()
  @ValidateNested({message: getValidateMessage(ValidateTypeEnum.ValidateNested)})
  public location?: Location;
}

export default UpdateOfferDto;
