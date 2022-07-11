import { FormEvent, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import Rating from '../rating/rating';
import { useAppDispatch } from '../../hooks/';
import { postReview } from '../../store/api-actions';
import { NewReview } from '../../types/new-review';

const Limit = {
  MIN: 50,
  MAX: 300,
};

type ReviewFormProps = {
  id: string;
};

function ReviewForm({ id }: ReviewFormProps) {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const isValid =
    rating !== '' && comment.length >= Limit.MIN && comment.length <= Limit.MAX;

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const review: NewReview = { rating: Number(rating), comment };
    setIsDisabled(true);

    const response = await dispatch(postReview({ id, review }));
    if (response.meta.requestStatus === 'rejected') {
      toast.error('Can\'t post review');
    }

    setIsDisabled(false);
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <Rating onChange={useCallback(setRating, [setRating])} currentRank={rating} isDisabled={isDisabled} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={(evt) => setComment(evt.target.value)}
        disabled={isDisabled}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">{Limit.MIN} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
