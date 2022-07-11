import cn from 'classnames';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoritesList from '../favorites-list/favorites-list';

type FavoritesContentProps = {
  isEmpty: boolean;
};

function FavoritesContent({ isEmpty }: FavoritesContentProps) {
  return (
    <main
      className={cn('page__main', 'page__main--favorites', {
        'page__main--favorites-empty': isEmpty,
      })}
    >
      <div className="page__favorites-container container">
        {isEmpty && <FavoritesEmpty />}

        {!isEmpty && <FavoritesList />}
      </div>
    </main>
  );
}

export default FavoritesContent;
