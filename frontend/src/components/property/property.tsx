import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { toast } from 'react-toastify';
import BookmarkButton from '../bookmark-button/bookmark-button';
import PremiumMark from '../premium-mark/premium-mark';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
import { Offer } from '../../types/offer';
import { getIsAuth, getIsAuthor } from '../../store/user-data/selectors';
import { getReviews } from '../../store/reviews-data/selectors';
import { deleteOffer } from '../../store/api-actions';
import { capitalize } from '../../utils';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { AppRoute } from '../../const';

type PropertyProps = {
  offer: Offer;
};

function Property({ offer }: PropertyProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(getIsAuth);
  const isAuthor = useAppSelector((state) => getIsAuthor(state, offer.host));
  const reviews = useAppSelector(getReviews);
  const {
    images,
    title,
    isPremium,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
    id,
  } = offer;

  const ratingWidth = `${Math.round(rating) * (100 / 5)}%`;
  const capitalizedType = capitalize(type);

  const handleDeleteClick = async () => {
    const response = await dispatch(deleteOffer(id));
    if (response.meta.requestStatus === 'rejected') {
      toast.error('Can\'t delete offer');
    } else {
      navigate(AppRoute.Main);
    }
  };

  return (
    <>
      <div className="property__gallery-container container">
        <div className="property__gallery">
          {images.slice(0, 6).map((image) => (
            <div key={image} className="property__image-wrapper">
              <img className="property__image" src={image} alt={title} />
            </div>
          ))}
        </div>
      </div>
      <div className="property__container container">
        <div className="property__wrapper">
          {isPremium && <PremiumMark className="property" />}
          <div className="property__name-wrapper">
            <h1 className="property__name">{title}</h1>
            <BookmarkButton className="property" id={id} />
          </div>
          {isAuthor && (
            <div className="property__controls">
              <Link
                to={`${AppRoute.EditBase}${id}`}
                className="property__edit-link"
              >
                Edit
              </Link>
              <button
                className="property__delete-button"
                type="button"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          )}
          <div className="property__rating rating">
            <div className="property__stars rating__stars">
              <span style={{ width: ratingWidth }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="property__rating-value rating__value">
              {rating}
            </span>
          </div>
          <ul className="property__features">
            <li className="property__feature property__feature--entire">
              {capitalizedType}
            </li>
            <li className="property__feature property__feature--bedrooms">
              {bedrooms} Bedroom{bedrooms > 1 && 's'}
            </li>
            <li className="property__feature property__feature--adults">
              Max {maxAdults} adult{maxAdults > 1 && 's'}
            </li>
          </ul>
          <div className="property__price">
            <b className="property__price-value">&euro;{price}</b>
            <span className="property__price-text">&nbsp;night</span>
          </div>
          {goods.length && (
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {goods.map((good) => (
                  <li key={good} className="property__inside-item">
                    {good}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="property__host">
            <h2 className="property__host-title">Meet the host</h2>
            <div className="property__host-user user">
              <div
                className={cn(
                  'property__avatar-wrapper',
                  'user__avatar-wrapper',
                  { 'property__avatar-wrapper--pro': host.isPro }
                )}
              >
                <img
                  className="property__avatar user__avatar"
                  src={host.avatarUrl}
                  width="74"
                  height="74"
                  alt={host.name}
                />
              </div>
              <span className="property__user-name">{host.name}</span>
              {host.isPro && <span className="property__user-status">Pro</span>}
            </div>
            <div className="property__description">
              <p className="property__text">{description}</p>
            </div>
          </div>
          <section className="property__reviews reviews">
            <h2 className="reviews__title">
              Reviews &middot;{' '}
              <span className="reviews__amount">{reviews.length}</span>
            </h2>
            <ReviewsList reviews={reviews} />
            {isAuth && <ReviewForm id={id} />}
          </section>
        </div>
      </div>
    </>
  );
}

export default Property;
