import {OfferApi} from '../types/offer-api';
import {Offer} from '../types/offer';
import {OfferUpdateApi} from '../types/offer-update-api';
import {NewOffer} from '../types/new-offer';
import {NewOfferApi} from '../types/new-offer-api';

export const adaptOfferApi = (
    {
        id,
        city,
        previewImage,
        images,
        title,
        isPremium,
        isFavorite,
        rating,
        type,
        bedrooms,
        maxAdults,
        price,
        goods,
        host: {
          id: idHost,
          avatarUrl,
          email,
          isPro,
          name,
        },
        description,
        location
    }: OfferApi): Offer => {
    return {
        bedrooms,
        city,
        description,
        goods: goods.map((good) => good.name),
        host: {
          id: idHost,
          avatarUrl,
          email,
          isPro,
          name,
        },
        id,
        images,
        isFavorite,
        isPremium,
        location,
        maxAdults,
        previewImage,
        price,
        rating,
        title,
        type: type.name
    }
}

export const adaptOffersApi = (offers: OfferApi[]): Offer[] => {
    return offers.map((offer) => adaptOfferApi(offer));
}

export const adaptOfferUpdate = (
    {
        bedrooms,
        city,
        description,
        goods,
        images,
        isPremium,
        location,
        maxAdults,
        previewImage,
        price,
        rating,
        title,
        type
    }: Offer): OfferUpdateApi => {
    return {
        city,
        previewImage,
        images,
        title,
        isPremium,
        rating,
        type,
        bedrooms,
        maxAdults,
        price,
        goods,
        description,
        location
    }
}

export const adaptNewOfferApi = (
    {
        title,
        description,
        city,
        previewImage,
        isPremium,
        type,
        bedrooms,
        maxAdults,
        price,
        goods,
        location,
    }: NewOffer): NewOfferApi => {
    return {
        city: city.id ?? '',
        previewImage,
        images: [],
        title,
        isPremium,
        rating: 0,
        type,
        bedrooms,
        maxAdults,
        price,
        goods,
        description,
        location,
        createdDate: new Date()
    }
}
