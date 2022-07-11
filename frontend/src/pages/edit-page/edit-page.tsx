import { useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/header/header';
import EditForm from '../../components/edit-form/edit-form';
import Spinner from '../../components/spinner/spinner';
import NotFoundPage from '../not-found-page/not-found-page';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOffer, editOffer } from '../../store/api-actions';
import { getActiveOffer, getIsLoading } from '../../store/offer-data/selectors';

function EditPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const offer = useAppSelector(getActiveOffer);
  const isLoading = useAppSelector(getIsLoading);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchOffer(id));
  }, [dispatch, id]);

  const handleSubmit = useCallback(async (offerData: Offer) => {
    const response = await dispatch(editOffer(offerData));
    if (response.meta.requestStatus === 'rejected') {
      toast.error('Can\'t edit offer');
    } else {
      navigate(`${AppRoute.OfferBase}${id}`);
    }
  }, [dispatch, id, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return <NotFoundPage />;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main">
        <div className="container">
          <section>
            <h1>Edit offer</h1>
            <EditForm offer={offer} onSubmit={handleSubmit} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
}

export default EditPage;
