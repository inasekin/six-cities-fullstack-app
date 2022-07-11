import { memo } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { capitalize } from '../../utils';
import { AppRoute } from '../../const';
import BookmarkButton from '../bookmark-button/bookmark-button';
import PremiumMark from '../premium-mark/premium-mark';

type OfferCardProps = {
  offer: Offer;
  extraClass: string;
  onCardHover?: (id: string | null) => void;
  isSmall?: boolean;
};

function OfferCard({
  offer,
  extraClass,
  onCardHover,
  isSmall,
}: OfferCardProps) {
  const {
    id,
    isPremium,
    previewImage,
    title,
    price,
    rating,
    type,
  } = offer;

  const capitalizedType = capitalize(type);
  const offerPageUrl = generatePath(`${AppRoute.OfferBase}:id`, { id });
  const ratingWidth = `${Math.round(rating) * (100 / 5)}%`;

  return (
    <article
      className={`${extraClass}__card ${extraClass}__place-card place-card`}
      onMouseEnter={() => onCardHover?.(id)}
      onMouseLeave={() => onCardHover?.(null)}
    >
      {isPremium && <PremiumMark className="place-card" />}
      <div className={`${extraClass}__image-wrapper place-card__image-wrapper`}>
        <Link to={offerPageUrl}>
          <img
            className="place-card__image"
            src={previewImage}
            width={isSmall ? '150' : '260'}
            height={isSmall ? '110' : '200'}
            alt={title}
          />
        </Link>
      </div>
      <div className={`${extraClass}__card-info place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton className="place-card" id={id} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerPageUrl}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizedType}</p>
      </div>
    </article>
  );
}

export default memo(OfferCard, (prevProps, nextProps) => prevProps.offer.id === nextProps.offer.id);
