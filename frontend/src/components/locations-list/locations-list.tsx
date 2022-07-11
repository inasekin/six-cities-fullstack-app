import cn from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getCities, getActiveCity } from '../../store/cities-data/selectors';
import { useAppSelector } from '../../hooks/';

function LocationsList() {
  const cities = useAppSelector(getCities);
  const activeCity = useAppSelector(getActiveCity);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li key={city.name} className="locations__item">
            <Link
              className={cn('locations__item-link tabs__item', {
                'tabs__item tabs__item--active': city === activeCity,
              })}
              to={`${AppRoute.Main}?city=${city.name}`}
            >
              <span>{city.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LocationsList;
