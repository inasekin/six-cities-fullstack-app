import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getRandomCity } from '../../store/cities-data/selectors';
import { AppRoute } from '../../const';

function LoginLocation() {
  const randomCity = useAppSelector(getRandomCity);

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link
          className="locations__item-link"
          to={`${AppRoute.Main}?city=${randomCity.name}`}
        >
          <span>{randomCity.name}</span>
        </Link>
      </div>
    </section>
  );
}

export default LoginLocation;
