import reviewsReducer, { ReviewsAction } from './reducer';
import type { Review, ReviewsState } from './types';
import {
  LOAD_REVIEWS_START,
  LOAD_REVIEWS_SUCCESS,
  LOAD_REVIEWS_FAILURE,
} from '../../const';

describe('reviews reducer', () => {
  const initialState: ReviewsState = {
    reviews: [],
    isLoading: false,
    error: null,
  };

  const createMockReview = (id: string): Review => ({
    id,
    date: '2024-01-01T10:00:00.000Z',
    comment: 'Nice place',
    rating: 4,
    user: {
      name: 'John',
      avatarUrl: 'img/avatar.jpg',
      isPro: false,
    },
  });

  it('should return initial state with unknown action', () => {
    const action = { type: 'UNKNOWN' } as unknown as ReviewsAction;

    expect(reviewsReducer(undefined, action)).toEqual(initialState);
  });

  it('should handle LOAD_REVIEWS_START', () => {
    const action: ReviewsAction = {
      type: LOAD_REVIEWS_START,
    };

    const state = reviewsReducer(initialState, action);

    expect(state).toEqual({
      reviews: [],
      isLoading: true,
      error: null,
    });
  });

  it('should handle LOAD_REVIEWS_SUCCESS', () => {
    const mockReviews = [createMockReview('1'), createMockReview('2')];

    const action: ReviewsAction = {
      type: LOAD_REVIEWS_SUCCESS,
      payload: mockReviews,
    };

    const state = reviewsReducer({ ...initialState, isLoading: true }, action);

    expect(state).toEqual({
      reviews: mockReviews,
      isLoading: false,
      error: null,
    });
  });

  it('should handle LOAD_REVIEWS_FAILURE', () => {
    const action: ReviewsAction = {
      type: LOAD_REVIEWS_FAILURE,
      payload: 'Error happened',
    };

    const state = reviewsReducer({ ...initialState, isLoading: true }, action);

    expect(state).toEqual({
      reviews: [],
      isLoading: false,
      error: 'Error happened',
    });
  });
});
