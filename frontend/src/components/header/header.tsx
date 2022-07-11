import { Link } from 'react-router-dom';
import Navigation from '../navigation/navigation';
import { AppRoute } from '../../const';

type HeaderProps = {
  withNav?: boolean;
};

function Header({ withNav = true }: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.Main}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          {withNav && <Navigation />}
        </div>
      </div>
    </header>
  );
}

export default Header;
