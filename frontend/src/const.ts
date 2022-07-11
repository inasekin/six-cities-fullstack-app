import { City } from './types/city';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  OfferBase = '/offer/',
  Register = '/register',
  EditBase = '/edit/',
  Add = '/add',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_ACTIVE = '/img/pin-active.svg';

export const CITIES: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
    },
  },
];

export const DEFAULT_CITY_INDEX = 0;

export enum NameSpace {
  Cities = 'CITIES',
  Offers = 'OFFERS',
  Offer = 'OFFER',
  Premium = 'PREMIUM',
  Favorite = 'FAVORITE',
  Reviews = 'REVIEWS',
  User = 'USER',
}

export enum APIRoute {
  Offers = '/offers',
  Premium = '/premium',
  Favorite = '/favorites',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Register = '/register',
  Add = '/add',
  SetAvatar = '/avatar',
  Users = '/users'
}

export enum SortingOption {
  Default = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  Rating = 'Top rated first',
}

export enum TokenTypes {
  Token = 'wtw-token',
  RefreshToken = 'wtw-refresh-token'
}

export const TYPES = ['apartment', 'house', 'room', 'hotel'];

export const GOODS = [
  'Breakfast',
  'Air conditioning',
  'Laptop friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge',
];

export const Zoom = {
  City: 13,
  Offer: 16,
};
