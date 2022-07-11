import {City} from './city';
import {Location} from './location';

type Good = {
    id: string;
    name: string;
}

export type OfferApi = {
    id: string;
    city: City;
    previewImage: string;
    images: string[];
    title: string;
    isPremium: boolean;
    isFavorite: boolean;
    rating: number;
    type: {
        id: string;
        name: string;
    };
    bedrooms: number;
    maxAdults: number;
    price: number;
    goods: Good[];
    host: {
        id: string;
        avatarUrl: string;
        email: string;
        isPro: boolean;
        name: string;
    };
    description: string;
    location: Location;
    createdDate: Date;
    commentCount: number;
};
