import { Navigate } from 'react-router-dom';
import Header from '../../components/header/header';
import RegisterForm from '../../components/register-form/register-form';
import { useAppSelector } from '../../hooks';
import { getIsAuth } from '../../store/user-data/selectors';
import { AppRoute } from '../../const';

function RegisterPage() {
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
            <h1 className="login__title">Sign up</h1>
            <RegisterForm />
          </section>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
