import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import EditPage from '../../pages/edit-page/edit-page';
import PrivateRoute from '../private-route/private-route';
import RegisterPage from '../../pages/register-page/register-page';
import AddPage from '../../pages/add-page/add-page';
import { useAppDispatch } from '../../hooks/';
import { checkAuth } from '../../store/api-actions';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route path={`${AppRoute.OfferBase}:id`} element={<OfferPage />} />
      <Route path={AppRoute.Register} element={<RegisterPage />} />
      <Route
        path={`${AppRoute.EditBase}:id`}
        element={
          <PrivateRoute>
            <EditPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Add}
        element={
          <PrivateRoute>
            <AddPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
