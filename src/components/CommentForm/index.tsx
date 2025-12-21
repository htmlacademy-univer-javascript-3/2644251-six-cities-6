import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postReview } from '../../store/reviews/reducer';
import type { AppDispatch, RootState } from '../../store';
import { useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';

function CommentForm(): JSX.Element | null {
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const isAuthorized = useSelector(
    (state: RootState) =>
      state.auth.authorizationStatus === AuthorizationStatus.Auth
  );

  if (!isAuthorized) {
    return null;
  }

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(evt.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!id || rating === null || review.length < 50) {
      return;
    }
    dispatch(postReview(id, review, rating));
    setReview('');
    setRating(null);
  };

  const isSubmitDisabled = review.length < 50 || rating === null;

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={rating === star}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={
                ['terribly', 'badly', 'not bad', 'good', 'perfect'][5 - star]
              }
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </div>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={handleTextChange}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
