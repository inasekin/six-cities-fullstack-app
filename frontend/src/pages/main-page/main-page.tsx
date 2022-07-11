import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import Spinner from '../../components/spinner/spinner';
import Cities from '../../components/cities/cities';
import { useAppSelector, useAppDispatch } from '../../hooks/';
import {
  setActiveCity,
  setActiveCityToDefault,
} from '../../store/cities-data/cities-data';
import { getCities } from '../../store/cities-data/selectors';
import { getIsLoading } from '../../store/offers-data/selectors';
import { setSortingToDefault } from '../../store/offers-data/offers-data';

function MainPage() {
  const dispatch = useAppDispatch();
  const cities = useAppSelector(getCities);
  const isLoading = useAppSelector(getIsLoading);
  const [searchParams] = useSearchParams();
  const searchCity = searchParams.get('city');

  useEffect(() => {
    dispatch(setSortingToDefault());
    if (!searchCity) {
      dispatch(setActiveCityToDefault());
    }
    const newCity = cities.find((city) => city.name === searchCity);
    if (newCity) {
      dispatch(setActiveCity(newCity));
    }
  }, [searchCity, dispatch, cities]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationsList />
        </div>
        <Cities />
      </main>
    </div>
  );
}

export default MainPage;
