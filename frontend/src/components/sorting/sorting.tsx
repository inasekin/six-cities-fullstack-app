import { useState, memo } from 'react';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setSorting } from '../../store/offers-data/offers-data';
import { getSorting } from '../../store/offers-data/selectors';
import { SortingOption } from '../../const';

function Sorting() {
  const dispatch = useAppDispatch();
  const currentSorting = useAppSelector(getSorting);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleSortingItemClick = (option: SortingOption) => {
    dispatch(setSorting(option));
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened((prevState) => !prevState)}
      >
        {currentSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={cn('places__options', 'places__options--custom', {
          'places__options--opened': isOpened,
        })}
      >
        {Object.entries(SortingOption).map(([key, value]) => (
          <li
            key={key}
            className={cn('places__option', {
              'places__option--active': key === currentSorting,
            })}
            tabIndex={0}
            onClick={() => handleSortingItemClick(value)}
          >
            {value}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default memo(Sorting);
