import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import Header from '../../components/header/header';
import Spinner from '../../components/spinner/spinner';
import FavoritesContent from '../../components/favorites-content/favorites-content';
import { AppRoute } from '../../const';
import {
  getCitiesWithOffers,
  getIsLoading,
} from '../../store/favorite-data/selectors';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import { fetchFavoriteOffers } from '../../store/api-actions';

function FavoritesPage() {
  const dispatch = useAppDispatch();
  const cities = useAppSelector(getCitiesWithOffers);
  const isLoading = useAppSelector(getIsLoading);
  const isEmpty = cities.length === 0;

  useEffect(() => {
    dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={cn('page', { 'page--favorites-empty': isEmpty })}>
      <Header />
      <FavoritesContent isEmpty={isEmpty} />
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

export default FavoritesPage;
