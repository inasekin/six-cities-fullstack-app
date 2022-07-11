import { createSelector } from '@reduxjs/toolkit';
import { State, FavoriteState } from '../../types/state';
import { NameSpace } from '../../const';
import { Offer } from '../../types/offer';

export const getFavoriteOffers = createSelector(
  (state: State) => state[NameSpace.Favorite],
  (state: FavoriteState) => state.favoriteOffers
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Favorite],
  (state: FavoriteState) => state.isLoading
);

export const getOffersByCity = createSelector(getFavoriteOffers, (offers) =>
  offers.reduce<{ [key: string]: Offer[] }>((acc, current) => {
    if (current.isFavorite) {
      const city = current.city.name;
      if (!acc[city]) {
        acc[city] = [];
      }
      acc[city].push(current);
    }

    return acc;
  }, {})
);

export const getCitiesWithOffers = createSelector(
  [getOffersByCity],
  (offersByCity) => Object.keys(offersByCity)
);
