import { Navigate } from 'react-router-dom';
import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import LoginLocation from '../../components/login-location/login-location';
import { useAppSelector } from '../../hooks';
import { getIsAuth } from '../../store/user-data/selectors';
import { AppRoute } from '../../const';

function LoginPage() {
  const isAuth = useAppSelector(getIsAuth);

  if (isAuth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <div className="page page--gray page--login">
      <Header withNav={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <LoginLocation />
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
