import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortingOption } from '../../const';
import { OffersState } from '../../types/state';

const initialState: OffersState = {
  offers: [],
  isLoading: false,
  sorting: SortingOption.Default,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setOffers: (state, action) => {
      state.offers = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setOffer: (state, action) => {
      const index = state.offers.findIndex(
        (offer) => offer.id === action.payload.id
      );
      state.offers[index] = action.payload;
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
    setSortingToDefault: (state) => {
      state.sorting = SortingOption.Default;
    },
  },
});

export const { setLoading, setOffers, setOffer, setSorting, setSortingToDefault } =
  offersData.actions;
