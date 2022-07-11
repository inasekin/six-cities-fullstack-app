import { FormAction, FormActionType } from '../../types/edit-form';
import { CITIES, DEFAULT_CITY_INDEX } from '../../const';

const getLocation = (location: string) => {
  const coords = location.split(', ');

  return {
    latitude: Number(coords[0]),
    longitude: Number(coords[1]),
  };
};

export function formReducer<T>(state: T, action: FormAction): T {
  const { type, payload } = action;
  switch (type) {
    case FormActionType.setTitle:
      return { ...state, title: payload };
    case FormActionType.setDescription:
      return { ...state, description: payload };
    case FormActionType.setCity: {
      const newCity =
        CITIES.find((city) => city.name === payload) ??
        CITIES[DEFAULT_CITY_INDEX];
      return {
        ...state,
        city: newCity,
        location: newCity.location,
      };
    }
    case FormActionType.setPreviewImage:
      return { ...state, previewImage: payload };
    case FormActionType.setIsPremium:
      return { ...state, isPremium: payload === 'true' };
    case FormActionType.setType:
      return { ...state, type: payload };
    case FormActionType.setBedrooms:
      return { ...state, bedrooms: Number(payload) };
    case FormActionType.setMaxAdults:
      return { ...state, maxAdults: Number(payload) };
    case FormActionType.setPrice:
      return { ...state, price: Number(payload) };
    case FormActionType.setGoods:
      return { ...state, goods: payload.split(', ') };
    case FormActionType.setLocation:
      return {
        ...state,
        location: getLocation(payload),
      };
    default:
      return state;
  }
}
