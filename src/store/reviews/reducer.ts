import { ThunkAction } from 'redux-thunk';
import { Review, ReviewsState } from './types';
import { RootState } from '..';
import { AxiosError, AxiosInstance } from 'axios';

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  error: null,
};

const LOAD_REVIEWS_START = 'reviews/loadStart';
const LOAD_REVIEWS_SUCCESS = 'reviews/loadSuccess';
const LOAD_REVIEWS_FAILURE = 'reviews/loadFailure';

export type ReviewsAction =
  | ReturnType<typeof loadReviewsStart>
  | ReturnType<typeof loadReviewsSuccess>
  | ReturnType<typeof loadReviewsFailure>;

const loadReviewsStart = () => ({
  type: LOAD_REVIEWS_START as typeof LOAD_REVIEWS_START,
});

const loadReviewsSuccess = (reviews: Review[]) => ({
  type: LOAD_REVIEWS_SUCCESS as typeof LOAD_REVIEWS_SUCCESS,
  payload: reviews,
});

const loadReviewsFailure = (error: string) => ({
  type: LOAD_REVIEWS_FAILURE as typeof LOAD_REVIEWS_FAILURE,
  payload: error,
});

export const loadReviews =
  (
    offerId: number
  ): ThunkAction<Promise<void>, RootState, AxiosInstance, ReviewsAction> =>
    async (dispatch, _getState, api) => {
      dispatch(loadReviewsStart());

      try {
        const { data } = await api.get<Review[]>(`/comments/${offerId}`);
        dispatch(loadReviewsSuccess(data));
      } catch (error) {
        const err = error as AxiosError;
        dispatch(loadReviewsFailure(err.message ?? 'Failed to load reviews'));
      }
    };

export default function reviewsReducer(
  state: ReviewsState = initialState,
  action: ReviewsAction
): ReviewsState {
  switch (action.type) {
    case LOAD_REVIEWS_START:
      return { ...state, isLoading: true, error: null };

    case LOAD_REVIEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reviews: action.payload,
      };

    case LOAD_REVIEWS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const postReview =
  (
    offerId: string,
    comment: string,
    rating: number
  ): ThunkAction<Promise<void>, RootState, AxiosInstance, ReviewsAction> =>
    async (dispatch, _getState, api) => {
      await api.post(`/comments/${offerId}`, {
        comment,
        rating,
      });

      const { data } = await api.get<Review[]>(`/comments/${offerId}`);
      dispatch(loadReviewsSuccess(data));
    };
