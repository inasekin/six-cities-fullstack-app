import { combineReducers } from 'redux';
import { NameSpace } from '../const';
import { citiesData } from './cities-data/cities-data';
import { offersData } from './offers-data/offers-data';
import { offerData } from './offer-data/offer-data';
import { premiumData } from './premium-data/premium-data';
import { favoriteData } from './favorite-data/favorite-data';
import { reviewsData } from './reviews-data/reviews-data';
import { userData } from './user-data/user-data';

export const rootReducer = combineReducers({
  [NameSpace.Cities]: citiesData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Offer]: offerData.reducer,
  [NameSpace.Premium]: premiumData.reducer,
  [NameSpace.Favorite]: favoriteData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.User]: userData.reducer,
});
