import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FavoriteState } from '../../types/state';

const initialState: FavoriteState = {
  favoriteOffers: [],
  isLoading: false,
};

export const favoriteData = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {
    setFavoriteOffers: (state, action) => {
      state.favoriteOffers = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading, setFavoriteOffers } = favoriteData.actions;
