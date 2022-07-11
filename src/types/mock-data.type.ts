import { City } from './city.type.js';
import {User} from './user.type.js';

export type MockData = {
  titles: string[];
  descriptions: string[];
  cities: City[];
  images: string[];
  buildings_type: string[];
  goods: string[];
  authors: User[];
};
