import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferState } from '../../types/state';

const initialState: OfferState = {
  activeOffer: null,
  isLoading: false,
};

export const offerData = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    setActiveOffer: (state, action) => {
      state.activeOffer = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading, setActiveOffer } = offerData.actions;
