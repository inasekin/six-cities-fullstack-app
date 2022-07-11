import { createSelector } from '@reduxjs/toolkit';
import { State, CitiesState } from '../../types/state';
import { NameSpace } from '../../const';

export const getCities = createSelector(
  (state: State) => state[NameSpace.Cities],
  (state: CitiesState) => state.cities
);

export const getActiveCity = createSelector(
  (state: State) => state[NameSpace.Cities],
  (state: CitiesState) => state.activeCity
);

export const getRandomCity = createSelector(
  (state: State) => state[NameSpace.Cities],
  (state: CitiesState) => state.cities[Math.floor(Math.random() * state.cities.length)]
);
