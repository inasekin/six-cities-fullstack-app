import { City } from './city';
import { Location } from './location';

export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: {
    id: string;
    avatarUrl: string;
    email: string;
    isPro: boolean;
    name: string;
  };
  id: string;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};
