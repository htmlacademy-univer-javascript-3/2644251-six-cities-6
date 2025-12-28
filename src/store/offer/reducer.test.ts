import { LOAD_ERROR, LOAD_START, LOAD_SUCCESS, SET_REVIEWS } from '../../const';
import { Offer } from '../offers/types';
import { Review } from '../reviews/types';
import offerPageReducer from './reducer';
import type { OfferDetailed, OfferPageState } from './types';

describe('offerPage reducer', () => {
  const initialState: OfferPageState = {
    offer: null,
    nearbyOffers: [],
    reviews: [],
    isLoading: false,
    hasError: false,
  };

  it('should handle LOAD_START', () => {
    const state = offerPageReducer(initialState, { type: LOAD_START });
    expect(state.isLoading).toBe(true);
    expect(state.hasError).toBe(false);
  });

  it('should handle LOAD_SUCCESS', () => {
    const state = offerPageReducer(initialState, {
      type: LOAD_SUCCESS,
      payload: {
        offer: { id: 1 } as OfferDetailed,
        nearby: [{ id: 2 } as Offer],
      },
    });

    expect(state.offer).not.toBeNull();
    expect(state.nearbyOffers.length).toBe(1);
    expect(state.isLoading).toBe(false);
  });

  it('should handle SET_REVIEWS', () => {
    const reviews = [
      {
        id: '1',
        comment: 'Nice',
        rating: 4,
        user: { name: 'User', avatarUrl: '', isPro: false },
        date: '2024-01-01',
      },
    ] satisfies Review[];

    const state = offerPageReducer(initialState, {
      type: SET_REVIEWS,
      payload: reviews,
    });

    expect(state.reviews.length).toBe(1);
  });

  it('should handle LOAD_ERROR', () => {
    const state = offerPageReducer(initialState, { type: LOAD_ERROR });
    expect(state.hasError).toBe(true);
    expect(state.isLoading).toBe(false);
  });
});
