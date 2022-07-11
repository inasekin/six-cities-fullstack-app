import chalk from 'chalk';
import dayjs from 'dayjs';

// const printHeader = chalk.bold.bgBlackBright.hex('#0029ff');
//
// const printCommand = chalk.blue;

const printError = chalk.bold.red;

// const printInfo = chalk.yellow.bgGray;

const printSuccess = chalk.green.hex('#38ff00');

const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    cityName,
    cityLatitude,
    cityLongitude,
    cityZoom,
    previewImage,
    images,
    title,
    isFavorite,
    isPremium,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    email,
    hostName,
    hostType,
    hostAvatar,
    description,
    latitude,
    longitude,
    zoom,
    hostId,
    id,
    createdDate
  ] = tokens;

  return {
    city: {
      name: cityName,
      location: {
        latitude: +cityLatitude,
        longitude: +cityLongitude,
        zoom: +cityZoom,
      },
    },
    previewImage,
    images: images.split(','),
    title,
    isFavorite: Boolean(isFavorite),
    isPremium: Boolean(isPremium),
    rating: +rating,
    type,
    bedrooms: +bedrooms,
    maxAdults: +maxAdults,
    price: +price,
    goods: goods.split(','),
    host: {
      email,
      name: hostName,
      avatarUrl: hostAvatar,
      isPro: Boolean(hostType),
      id: hostId,
    },
    description,
    location: {
      latitude: +latitude,
      longitude: +longitude,
      zoom: +zoom,
    },
    id: +id,
    createdDate: dayjs(createdDate).toDate(),
  };
};

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export {
  printError,
  printSuccess,
  createOffer,
  getErrorMessage
};
