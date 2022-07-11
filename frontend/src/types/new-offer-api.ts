import {Location} from './location.js';

export type NewOfferApi = {
    city: string;
    previewImage: string;
    images: string[];
    title: string;
    isPremium: boolean;
    rating: number;
    type: string;
    bedrooms: number;
    maxAdults: number;
    price: number;
    goods: string[];
    description: string;
    location: Location;
    createdDate: Date;
};
