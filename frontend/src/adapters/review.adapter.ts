import {ReviewApi} from '../types/review-api';
import {Review} from '../types/review';
import {formatDate} from '../utils';
import {NewReview} from '../types/new-review';
import {NewReviewApi} from '../types/new-review-api';

export const adaptReviewApi = (
    {
        id,
        text,
        rating,
        createdDate,
        user
    }: ReviewApi): Review => {
    return {
        comment: text,
        date: formatDate(createdDate.toDateString()),
        id: id,
        rating: rating,
        user
    }
}

export const adaptReviewsApi = (reviews: ReviewApi[]): Review[] =>
    reviews.map((review) => adaptReviewApi(review));

export const adaptNewReview = ({comment}: NewReview): NewReviewApi => ({ text: comment });
