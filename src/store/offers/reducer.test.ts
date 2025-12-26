import offersReducer from './reducer';
import { setCity } from './reducer';
import type { OffersState } from './types';
import { vi } from 'vitest';

vi.mock('../store/offers/reducer', () => ({
  loadOffers: () => ({ type: 'offers/loadOffers' }),
}));

describe('offers reducer', () => {
  const initialState: OffersState = {
    city: 'Paris',
    offers: [],
    isLoading: false,
    error: null,
  };

  it('should change city', () => {
    const state = offersReducer(initialState, setCity('Amsterdam'));
    expect(state.city).toBe('Amsterdam');
  });
});
