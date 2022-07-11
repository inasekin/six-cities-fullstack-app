import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import { getPremiumOffers } from '../../store/premium-data/selector';
import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';

type PremiumPlacesProps = {
  offer: Offer;
};

function PremiumPlaces({ offer }: PremiumPlacesProps) {
  const premiumOffers = useAppSelector(getPremiumOffers);
  return (
    <>
      <Map
        offers={premiumOffers.concat(offer)}
        activeOffer={offer.id}
        city={offer.city}
        className="property__map"
      />
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Premium offers
          </h2>
          <OffersList offers={premiumOffers} className="near-places" />
        </section>
      </div>
    </>
  );
}

export default PremiumPlaces;
