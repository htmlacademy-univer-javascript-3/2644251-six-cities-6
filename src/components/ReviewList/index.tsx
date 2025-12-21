import Review from '../Review';
import { Review as ReviewType } from '../../store/reviews/types';
import React from 'react';

type ReviewListProps = {
  reviews: ReviewType[];
};

function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
}

const MemoizedReviewList = React.memo(ReviewList);
export default MemoizedReviewList;
