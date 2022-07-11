import {City} from './city';
import {Location} from './location';

export type OfferUpdateApi = {
    city?: City;
    previewImage?: string;
    images?: string[];
    title?: string;
    isPremium?: boolean;
    rating?: number;
    type?: string;
    bedrooms?: number;
    maxAdults?: number;
    price?: number;
    goods?: string[];
    description?: string;
    location?: Location;
};
