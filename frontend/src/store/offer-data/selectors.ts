import { createSelector } from '@reduxjs/toolkit';
import { State, OfferState } from '../../types/state';
import { NameSpace } from '../../const';

export const getActiveOffer = createSelector(
  (state: State) => state[NameSpace.Offer],
  (state: OfferState) => state.activeOffer
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Offer],
  (state: OfferState) => state.isLoading
);
