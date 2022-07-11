import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { PremiumState } from '../../types/state';

const initialState: PremiumState = {
  premiumOffers: [],
  isLoading: false,
};

export const premiumData = createSlice({
  name: NameSpace.Premium,
  initialState,
  reducers: {
    setPremiumOffers: (state, action) => {
      state.premiumOffers = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading, setPremiumOffers } = premiumData.actions;
