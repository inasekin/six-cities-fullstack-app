import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Spinner from '../../components/spinner/spinner';
import NotFoundPage from '../not-found-page/not-found-page';
import Property from '../../components/property/property';
import PremiumPlaces from '../../components/premium-places/premium-places';
import {
  getActiveOffer,
  getIsLoading as getOfferIsLoading,
} from '../../store/offer-data/selectors';
import { getIsLoading as getPremiumOffersIsLoading } from '../../store/premium-data/selector';
import { getIsLoading as getReviewsIsLoading } from '../../store/reviews-data/selectors';
import {
  fetchOffer,
  fetchPremiumOffers,
  fetchReviews,
} from '../../store/api-actions';
import { useAppSelector, useAppDispatch } from '../../hooks/';

function OfferPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const offer = useAppSelector(getActiveOffer);
  const isOfferLoading = useAppSelector(getOfferIsLoading);
  const isPremiumOffersIsLoading = useAppSelector(getPremiumOffersIsLoading);
  const isReaviewsIsLoading = useAppSelector(getReviewsIsLoading);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchOffer(id));
    dispatch(fetchPremiumOffers(id));
    dispatch(fetchReviews(id));
  }, [dispatch, id]);

  if (isOfferLoading || isPremiumOffersIsLoading || isReaviewsIsLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return <NotFoundPage />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <Property offer={offer} />
          <PremiumPlaces offer={offer} />
        </section>
      </main>
    </div>
  );
}

export default OfferPage;
