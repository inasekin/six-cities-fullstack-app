import { createSelector } from '@reduxjs/toolkit';
import { State, PremiumState } from '../../types/state';
import { NameSpace } from '../../const';

export const getPremiumOffers = createSelector(
  (state: State) => state[NameSpace.Premium],
  (state: PremiumState) => state.premiumOffers
);

export const getIsLoading = createSelector(
  (state: State) => state[NameSpace.Premium],
  (state: PremiumState) => state.isLoading
);
