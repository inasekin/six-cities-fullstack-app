import { store } from '../store';
import { Offer } from './offer';
import { City } from './city';
import { Review } from './review';
import { User } from './user';
import {AuthorizationStatus, SortingOption} from '../const';

export type CitiesState = {
  cities: City[];
  activeCity: City;
};

export type OffersState = {
  offers: Offer[];
  isLoading: boolean;
  sorting: SortingOption
};

export type OfferState = {
  activeOffer: Offer | null;
  isLoading: boolean;
};

export type PremiumState = {
  premiumOffers: Offer[];
  isLoading: boolean;
};

export type FavoriteState = {
  favoriteOffers: Offer[];
  isLoading: boolean;
};

export type ReviewsState = {
  reviews: Review[];
  isLoading: boolean;
};

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
