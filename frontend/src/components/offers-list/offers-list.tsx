import { memo } from 'react';
import OfferCard from '../../components/offer-card/offer-card';
import { Offer } from '../../types/offer';

type OffersListProps = {
  offers: Offer[];
  className: string;
  onCardHover?: (id: string | null) => void;
};

function OffersList({ offers, className, onCardHover }: OffersListProps) {
  return (
    <div
      className={`${className}__places-list ${className}__list places__list tabs__content`}
    >
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onCardHover={onCardHover}
          extraClass={className}
        />
      ))}
    </div>
  );
}

export default memo(OffersList);
