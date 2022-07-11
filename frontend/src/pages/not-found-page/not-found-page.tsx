import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../../components/header/header';

function NotFoundPage() {
  return (
    <div className="page not-found">
      <Header />
      <h1 className="not-found__title">404 Not found</h1>
      <p className="not-found__text">Return to the <Link to={AppRoute.Main} className="not-found__link">main page</Link></p>
    </div>
  );
}

export default NotFoundPage;
