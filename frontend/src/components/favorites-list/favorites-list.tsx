import { Link } from 'react-router-dom';
import OfferCard from '../../components/offer-card/offer-card';
import {
  getOffersByCity,
  getCitiesWithOffers,
} from '../../store/favorite-data/selectors';
import { useAppSelector } from '../../hooks/';
import { AppRoute } from '../../const';

function FavoritesList() {
  const cities = useAppSelector(getCitiesWithOffers);
  const offersByCities = useAppSelector(getOffersByCity);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {cities.map((city) => (
          <li key={city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link
                  className="locations__item-link"
                  to={`${AppRoute.Main}?city=${city}`}
                >
                  <span>{city}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {offersByCities[city].map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  extraClass="favorites"
                  isSmall
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FavoritesList;
