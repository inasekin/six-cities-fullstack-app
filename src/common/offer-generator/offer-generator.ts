import {generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems} from '../../utils/random.js';
import {MockData} from '../../types/mock-data.type.js';
import {OfferGeneratorInterface} from './offer-generator.interface.js';
import {City} from '../../types/city.type.js';
import {User} from '../../types/user.type.js';
import dayjs from 'dayjs';
import {
  ADULTS_MAX,
  ADULTS_MIN, LATITUDE_MAX,
  LATITUDE_MIN, LONGITUDE_MAX, LONGITUDE_MIN,
  PRICE_MAX,
  PRICE_MIN,
  RATING_MAX,
  RATING_MIN,
  ROOMS_MAX,
  ROOMS_MIN
} from '../constants.js';

const DIGIT_RATING = 1;
const DIGIT_LOCATION = 6;
const OFFER_ZOOM = 10;
const MIN_OFFER_ID = 1;
const MAX_OFFER_ID = 100000;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const randomCity: City = getRandomItem<City>(this.mockData.cities);
    const randomUser: User = getRandomItem<User>(this.mockData.authors);

    return [
      randomCity.name,
      randomCity.location.longitude,
      randomCity.location.latitude,
      randomCity.location.zoom,
      getRandomItem<string>(this.mockData.images),
      getRandomItems<string>(this.mockData.images).join(','),
      getRandomItem<string>(this.mockData.titles),
      getRandomBoolean(),
      getRandomBoolean(),
      generateRandomValue(RATING_MIN, RATING_MAX, DIGIT_RATING),
      getRandomItem<string>(this.mockData.buildings_type),
      generateRandomValue(ROOMS_MIN, ROOMS_MAX),
      generateRandomValue(ADULTS_MIN, ADULTS_MAX),
      generateRandomValue(PRICE_MIN, PRICE_MAX),
      getRandomItems<string>(this.mockData.goods).join(','),
      randomUser.email,
      randomUser.name,
      randomUser.isPro,
      randomUser.avatarUrl,
      getRandomItem<string>(this.mockData.descriptions),
      generateRandomValue(LATITUDE_MIN, LATITUDE_MAX, DIGIT_LOCATION),
      generateRandomValue(LONGITUDE_MIN, LONGITUDE_MAX, DIGIT_LOCATION),
      OFFER_ZOOM,
      randomUser.id,
      generateRandomValue(MIN_OFFER_ID, MAX_OFFER_ID),
      dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day'),
    ].join('\t');
  }
}
