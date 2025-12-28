import offersReducer, { setCity } from './reducer';
import type { OffersState, Offer } from './types';

describe('offers reducer', () => {
  const initialState: OffersState = {
    city: 'Paris',
    offers: [],
    isLoading: false,
    error: null,
  };

  const mockOffer: Offer = {
    id: 1,
    title: 'Test Offer',
    type: 'apartment',
    price: 100,
    rating: 4,
    previewImage: 'img.jpg',
    isPremium: false,
    isFavorite: false,
    location: { latitude: 0, longitude: 0, zoom: 10 },
    city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
  };

  it('should change city', () => {
    const state = offersReducer(initialState, setCity('Amsterdam'));
    expect(state.city).toBe('Amsterdam');
  });

  it('should handle TOGGLE_FAVORITE_SUCCESS', () => {
    const stateWithOffer = { ...initialState, offers: [mockOffer] };

    const updatedOffer = { ...mockOffer, isFavorite: true };

    const state = offersReducer(stateWithOffer, {
      type: 'offers/TOGGLE_FAVORITE_SUCCESS',
      payload: updatedOffer,
    });

    expect(state.offers[0].isFavorite).toBe(true);
  });
});
