import { City } from './city';
import { Location } from './location';

export type NewOffer = {
  title: string;
  description: string;
  city: City;
  previewImage: string;
  isPremium: boolean;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  location: Location;
};
