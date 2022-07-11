import { useState, useCallback } from 'react';
import Sorting from '../../components/sorting/sorting';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import MainEmpty from '../../components/main-empty/main-empty';
import { useAppSelector } from '../../hooks/';
import { getActiveCity } from '../../store/cities-data/selectors';
import { getActiveCityOffers } from '../../store/offers-data/selectors';

function Cities() {
  const activeCity = useAppSelector(getActiveCity);
  const cityOffers = useAppSelector(getActiveCityOffers);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleCardHover = useCallback((id: string | null) => {
    setActiveCard(id);
  }, []);

  return (
    <div className="cities">
      {!cityOffers.length ? (
        <MainEmpty cityName={activeCity.name} />
      ) : (
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {cityOffers.length} place
              {cityOffers.length > 1 && 's'} to stay in {activeCity.name}
            </b>
            <Sorting />
            {
              <OffersList
                offers={cityOffers}
                onCardHover={handleCardHover}
                className="cities"
              />
            }
          </section>
          <div className="cities__right-section">
            <Map
              offers={cityOffers}
              activeOffer={activeCard}
              city={activeCity}
              className="cities__map"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cities;
