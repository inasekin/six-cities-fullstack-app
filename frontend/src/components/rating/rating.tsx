import { Fragment, memo } from 'react';

type RatingProps = {
  onChange: (rank: string) => void;
  currentRank: string;
  isDisabled: boolean;
};

const ratings = [
  ['5', 'perfect'],
  ['4', 'good'],
  ['3', 'not bad'],
  ['2', 'badly'],
  ['1', 'terribly'],
];

function Rating({ onChange, currentRank, isDisabled }: RatingProps) {
  return (
    <div className="reviews__rating-form form__rating">
      {ratings.map(([rank, title]) => (
        <Fragment key={rank}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={rank}
            id={`${rank}-stars`}
            type="radio"
            onChange={() => onChange(rank)}
            checked={currentRank === rank}
            disabled={isDisabled}
          />
          <label
            htmlFor={`${rank}-stars`}
            className="reviews__rating-label form__rating-label"
            title={title}
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </Fragment>
      ))}
    </div>
  );
}

export default memo(Rating);
