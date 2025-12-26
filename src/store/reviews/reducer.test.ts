import reviewsReducer, { ReviewsAction } from './reducer';
import type { ReviewsState } from './types';

describe('reviews reducer', () => {
  const initialState: ReviewsState = {
    reviews: [],
    isLoading: false,
    error: null,
  };

  it('should return initial state', () => {
    const unknownAction = { type: 'UNKNOWN' } as unknown as ReviewsAction;
    expect(reviewsReducer(undefined, unknownAction)).toEqual(initialState);
  });
});
