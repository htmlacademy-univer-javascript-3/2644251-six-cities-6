import { Offer } from '../offers/types';
import { OfferDetailed, OfferPageState } from './types';
import { Review } from '../reviews/types';
import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { AxiosInstance } from 'axios';

export const LOAD_START = 'offer/loadStart' as const;
export const LOAD_SUCCESS = 'offer/loadSuccess' as const;
export const LOAD_ERROR = 'offer/loadError' as const;
export const SET_REVIEWS = 'offer/setReviews' as const;

export type LoadStartAction = {
  type: typeof LOAD_START;
};

export type LoadSuccessAction = {
  type: typeof LOAD_SUCCESS;
  payload: {
    offer: OfferDetailed;
    nearby: Offer[];
  };
};

export type SetReviewsAction = {
  type: typeof SET_REVIEWS;
  payload: Review[];
};

export type LoadErrorAction = {
  type: typeof LOAD_ERROR;
};

export type OfferPageAction =
  | LoadStartAction
  | LoadSuccessAction
  | SetReviewsAction
  | LoadErrorAction;

const initialState: OfferPageState = {
  offer: null,
  nearbyOffers: [],
  reviews: [],
  isLoading: false,
  hasError: false,
};

export default function offerPageReducer(
  state = initialState,
  action: OfferPageAction
): OfferPageState {
  switch (action.type) {
    case LOAD_START:
      return { ...state, isLoading: true, hasError: false };

    case LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        offer: action.payload.offer,
        nearbyOffers: action.payload.nearby,
      };

    case SET_REVIEWS:
      return { ...state, reviews: action.payload };

    case LOAD_ERROR:
      return { ...state, isLoading: false, hasError: true };

    default:
      return state;
  }
}

export const loadOfferPage =
  (
    offerId: string
  ): ThunkAction<Promise<void>, RootState, AxiosInstance, OfferPageAction> =>
    async (dispatch, _getState, api) => {
      dispatch({ type: LOAD_START });

      try {
        const [offerRes, nearbyRes, reviewsRes] = await Promise.all([
          api.get<OfferDetailed>(`/offers/${offerId}`),
          api.get<Offer[]>(`/offers/${offerId}/nearby`),
          api.get<Review[]>(`/comments/${offerId}`),
        ]);

        dispatch({
          type: LOAD_SUCCESS,
          payload: {
            offer: offerRes.data,
            nearby: nearbyRes.data,
          },
        });

        dispatch({
          type: SET_REVIEWS,
          payload: reviewsRes.data,
        });
      } catch {
        dispatch({ type: LOAD_ERROR });
      }
    };
