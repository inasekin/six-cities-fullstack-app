import { createSelector } from '@reduxjs/toolkit';
import { State, OffersState } from '../../types/state';
import { NameSpace } from '../../const';
import { sort } from '../../utils';
import { getActiveCity } from '../cities-data/selectors';

export const getSorting = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersState) => state.sorting
);

export const getOffers = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersState) => state.offers
);

export const getSortedOffers = createSelector(
  [getOffers, getSorting],
  (offers, sorting) => sort[sorting](offers)
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Offers],
  (state: OffersState) => state.isLoading
);

export const getActiveCityOffers = createSelector(
  [getSortedOffers, getActiveCity],
  (offers, activeCity) =>
    offers.filter((offer) => offer.city.name === activeCity.name)
);

export const getIsFavorite = createSelector(
  [getOffers, (_, id: string) => id],
  (offers, id) => offers.find((offer) => offer.id === id)?.isFavorite
);
