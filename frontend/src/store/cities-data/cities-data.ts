import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, CITIES, DEFAULT_CITY_INDEX } from '../../const';
import { CitiesState } from '../../types/state';

const initialState: CitiesState = {
  cities: CITIES,
  activeCity: CITIES[DEFAULT_CITY_INDEX],
};

export const citiesData = createSlice({
  name: NameSpace.Cities,
  initialState,
  reducers: {
    setActiveCity: (state, action) => {
      state.activeCity = action.payload;
    },
    setActiveCityToDefault: (state) => {
      state.activeCity = CITIES[DEFAULT_CITY_INDEX];
    },
  },
});

export const { setActiveCity, setActiveCityToDefault } = citiesData.actions;
