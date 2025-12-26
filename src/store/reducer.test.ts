import { reducer } from './reducer';
import { changeCity, loadOffers } from './action';
import { Offer } from './offers/types';

describe('main reducer', () => {
  const initialState = {
    city: 'Paris',
    offers: [],
  };

  it('should return initial state for unknown action', () => {
    const unknownAction = { type: 'UNKNOWN' } as unknown as ReturnType<
      typeof changeCity
    >;

    expect(reducer(undefined, unknownAction)).toEqual(initialState);
  });

  it('should handle changeCity', () => {
    const state = reducer(initialState, changeCity('Amsterdam'));
    expect(state.city).toBe('Amsterdam');
  });

  it('should handle loadOffers', () => {
    const offers = [{ id: 1 }] as Offer[];
    const state = reducer(initialState, loadOffers(offers));
    expect(state.offers).toEqual(offers);
  });
});
