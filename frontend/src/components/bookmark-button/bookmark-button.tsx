import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { setFavorite } from '../../store/api-actions';
import { getIsFavorite } from '../../store/offers-data/selectors';
import { getIsAuth } from '../../store/user-data/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/';
import {AppRoute} from '../../const';

type BookmarkButtonProps = {
  className: string;
  id: string;
};

function BookmarkButton({ className, id }: BookmarkButtonProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFavorite = useAppSelector((state) => getIsFavorite(state, id));
  const isAuth = useAppSelector(getIsAuth);

  const handleClick = () => {
    if (isAuth) {
      dispatch(setFavorite({ id, status: isFavorite ? 0 : 1 }));
    } else {
      navigate(AppRoute.Login);
    }

  };

  return (
    <button
      className={cn('button', `${className}__bookmark-button`, {
        [`${className}__bookmark-button--active`]: isFavorite,
      })}
      type="button"
      onClick={handleClick}
    >
      <svg className={`${className}__bookmark-icon`} width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{`${isFavorite ? 'In' : 'To'} bookmarks`}</span>
    </button>
  );
}

export default BookmarkButton;
