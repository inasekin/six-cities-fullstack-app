import {FavoriteOfferApi} from '../types/favorite-offer-api';
import {adaptOfferApi} from './offer.adapter';

export const adaptFavorite = ({offer}: FavoriteOfferApi) => adaptOfferApi(offer);
export const adaptFavorites = (favorites: FavoriteOfferApi[]) =>
    favorites.map((favorite) => adaptFavorite(favorite));
