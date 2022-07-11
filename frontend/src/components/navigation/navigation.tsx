import {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, TokenTypes} from '../../const';
import {getIsAuth, getUser} from '../../store/user-data/selectors';
import {logout} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getToken} from '../../services/token';

function Navigation() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);
  const user = useAppSelector(getUser);

  const handleSignOutClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logout({ refreshToken: getToken(TokenTypes.RefreshToken) }));
  };

  return (
    <nav className="header__nav">
      {isAuth && user && (
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link className="header__nav-link" to={AppRoute.Add}>
              <span className="header__login">+ Add new offer</span>
            </Link>
          </li>
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Favorites}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">{user.email}</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              to={AppRoute.Main}
              onClick={handleSignOutClick}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
      )}

      {!isAuth && (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Login}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Register}
            >
              <span className="header__login">Sign up</span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
