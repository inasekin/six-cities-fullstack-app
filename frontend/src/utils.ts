import { SortingOption } from './const';
import { Offer } from './types/offer';

const capitalize = (str: string) => str ? str[0].toUpperCase() + str.slice(1) : '';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
    new Date(date)
  );

const sort = {
  [SortingOption.Default]: (offers: Offer[]) => [...offers],
  [SortingOption.HighToLow]: (offers: Offer[]) =>
    [...offers].sort((a, b) => b.price - a.price),
  [SortingOption.LowToHigh]: (offers: Offer[]) =>
    [...offers].sort((a, b) => a.price - b.price),
  [SortingOption.Rating]: (offers: Offer[]) =>
    [...offers].sort((a, b) => b.rating - a.rating),
};

export { capitalize, formatDate, sort };
