import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import {
  setOffers,
  setOffer,
  setLoading as setOffersIsLoading,
} from './offers-data/offers-data';
import {
  setActiveOffer,
  setLoading as setOfferIsLoading,
} from './offer-data/offer-data';
import {
  setPremiumOffers,
  setLoading as setPremiumOffersIsLoading,
} from './premium-data/premium-data';
import {
  setReviews,
  setLoading as setReviewsIsLoading,
} from './reviews-data/reviews-data';
import {
  setFavoriteOffers,
  setLoading as setFavoriteOffersIsLoading,
} from './favorite-data/favorite-data';
import { setUser, setAuthorizationStatus } from './user-data/user-data';
import { AppDispatch, State } from '../types/state';
import { Offer } from '../types/offer';
import { NewReview } from '../types/new-review';
import { AuthData } from '../types/auth-data';
import { APIRoute, AuthorizationStatus, NameSpace } from '../const';
import { saveToken, dropToken } from '../services/token';
import { NewOffer } from '../types/new-offer';
import { NewUser } from '../types/new-user';
import { OfferApi } from '../types/offer-api';
import { adaptNewOfferApi, adaptOfferApi, adaptOffersApi, adaptOfferUpdate } from '../adapters/offer.adapter';
import { adaptNewReview, adaptReviewsApi } from '../adapters/review.adapter';
import { ReviewApi } from '../types/review-api';
import { AuthCheckData } from '../types/auth-check-data';
import { AuthResult } from '../types/auth-result';
import {User} from '../types/user';
import {FavoriteOfferApi} from '../types/favorite-offer-api';
import {adaptFavorite, adaptFavorites} from '../adapters/favorite.adapter';

type AsyncThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffers = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${NameSpace.Offers}/fetchOffers`,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersIsLoading(true));
    try {
      const { data } = await api.get<OfferApi[]>(APIRoute.Offers);
      dispatch(setOffers(adaptOffersApi(data)));
    } catch {
      toast.error('Can\'t fetch offers');
    } finally {
      dispatch(setOffersIsLoading(false));
    }
  }
);

export const fetchOffer = createAsyncThunk<void, string, AsyncThunkConfig>(
  `${NameSpace.Offer}/fetchOffer`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setOfferIsLoading(true));
    try {
      const { data } = await api.get<OfferApi>(`${APIRoute.Offers}/${id}`);
      dispatch(setActiveOffer(adaptOfferApi(data)));
    } catch {
      dispatch(setActiveOffer(null));
      toast.error('Can\'t fetch offer');
    } finally {
      dispatch(setOfferIsLoading(false));
    }
  }
);

export const editOffer = createAsyncThunk<void, Offer, AsyncThunkConfig>(
  `${NameSpace.Offer}/editOffer`,
  async (offerData: Offer, { dispatch, extra: api }) => {
    try {
      const { data } = await api.patch<OfferApi>(
        `${APIRoute.Offers}/${offerData.id}`,
          adaptOfferUpdate(offerData)
      );
      dispatch(setActiveOffer(adaptOfferApi(data)));
    } catch {
      throw new Error('Can\'t edit offer');
    }
  }
);

export const addOffer = createAsyncThunk<void, NewOffer, AsyncThunkConfig>(
  `${NameSpace.Offer}/addOffer`,
  async (offerData, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<OfferApi>(
        APIRoute.Add,
        adaptNewOfferApi(offerData)
      );
      dispatch(setActiveOffer(adaptOfferApi(data)));
    } catch {
      throw new Error('Can\'t add offer');
    }
  }
);

export const deleteOffer = createAsyncThunk<void, string, AsyncThunkConfig>(
  `${NameSpace.Offer}/deleteOffer`,
  async (id, { dispatch, extra: api }) => {
    try {
      await api.delete(`${APIRoute.Offers}/${id}`);
      dispatch(setActiveOffer(null));
    } catch {
      throw new Error('Can\'t delete offer');
    }
  }
);


export const fetchPremiumOffers = createAsyncThunk<
  void,
  string,
  AsyncThunkConfig
>(
  `${NameSpace.Premium}/fetchPremiumOffers`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setPremiumOffersIsLoading(true));
    try {
      const { data } = await api.get<OfferApi[]>(
        `${APIRoute.Offers}/${id}${APIRoute.Premium}`
      );
      dispatch(setPremiumOffers(adaptOffersApi(data)));
    } catch {
      toast.error('Can\'t fetch premium offers');
    } finally {
      dispatch(setPremiumOffersIsLoading(false));
    }
  }
);

export const fetchReviews = createAsyncThunk<void, string, AsyncThunkConfig>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setReviewsIsLoading(true));
    try {
      const { data } = await api.get<ReviewApi[]>(`${APIRoute.Offers}/${id}/${APIRoute.Comments}`);
      dispatch(setReviews(adaptReviewsApi(data)));
    } catch {
      toast.error('Can\'t fetch reviews');
    } finally {
      dispatch(setReviewsIsLoading(false));
    }
  }
);

export const postReview = createAsyncThunk<
  void,
  { id: string; review: NewReview },
  AsyncThunkConfig
>(
  `${NameSpace.Reviews}/postReview`,
  async ({ id, review }, { dispatch, extra: api }) => {
    try {
      await api.post<ReviewApi>(`${APIRoute.Offers}/${id}/${APIRoute.Comments}`, adaptNewReview(review));
      await dispatch(fetchReviews(id));
    } catch {
      toast.error('Can\'t post review');
    }
  }
);

export const checkAuth = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get(APIRoute.Users);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUser(data));
    } catch {
      dropToken();
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUser(null));
    }
  }
);

export const login = createAsyncThunk<void, AuthData, AsyncThunkConfig>(
  `${NameSpace.User}/login`,
  async (authData, { dispatch, extra: api }) => {
    try {
      const {data} = await api.post<AuthResult>(`${APIRoute.Users}${APIRoute.Login}`, authData);
      saveToken(data);
      dispatch(checkAuth());
    } catch {
      toast.error('Can\'t login');
    }
  }
);

export const logout = createAsyncThunk<void, AuthCheckData, AsyncThunkConfig>(
  `${NameSpace.User}/logout`,
  async (authCheckData, { dispatch, extra: api }) => {
    try {
      await api.post(`${APIRoute.Users}${APIRoute.Logout}`, authCheckData);
      dropToken();
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(setUser(null));
    } catch {
      toast.error('Can\'t logout');
    }
  }
);

export const fetchFavoriteOffers = createAsyncThunk<
  void,
  undefined,
  AsyncThunkConfig
>(
  `${NameSpace.Favorite}/fetchFavoriteFilms`,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setFavoriteOffersIsLoading(true));
    try {
      const { data } = await api.get<FavoriteOfferApi[]>(APIRoute.Favorite);
      dispatch(setFavoriteOffers(adaptFavorites(data)));
    } catch {
      toast.error('Can\'t fetch favorite films');
    } finally {
      dispatch(setFavoriteOffersIsLoading(false));
    }
  }
);

export const setFavorite = createAsyncThunk<
  void,
  { id: string; status: number },
  AsyncThunkConfig
>(
  `${NameSpace.Favorite}/setFavorite`,
  async ({ id, status }, { dispatch, extra: api }) => {
    try {
      status === 0 ?
        await api.delete(`${APIRoute.Favorite}/${id}`) :
        await api.post<FavoriteOfferApi>(`${APIRoute.Favorite}/${id}`);

      const { data } = await api.get<OfferApi>(`${APIRoute.Offers}/${id}`);
      dispatch(setOffer(adaptOfferApi(data)));
      dispatch(fetchFavoriteOffers());
    } catch {
      toast.error('Can\'t add to or remove from MyList');
    }
  }
);

export const registerUser = createAsyncThunk<void, NewUser, AsyncThunkConfig>(
  `${NameSpace.User}/register`,
  async (userData, { extra: api }) => {
    const { avatar } = userData;
    delete userData.avatar;

    try {
      const { data } = await api.post<User>(`${APIRoute.Users}`, userData);
      if (avatar) {
        await api.post(`/${APIRoute.Users}/${data.id}${APIRoute.SetAvatar}`, avatar);
      }
    } catch {
      throw new Error('Can\'t sign up');
    }
  }
);
