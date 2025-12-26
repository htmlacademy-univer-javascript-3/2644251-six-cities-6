import { configureStore, DeepPartial } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { RootState } from './store';
import offersReducer from './store/offers/reducer';
import authReducer from './store/auth/reducer';
import reviewsReducer from './store/reviews/reducer';
import offerReducer from './store/offer/reducer';
import { AuthorizationStatus } from './const';

type RenderOptions = {
  route?: string;
  preloadedState?: DeepPartial<RootState>;
};

export function renderWithProviders(
  ui: React.ReactElement,
  { route = '/', preloadedState }: RenderOptions = {}
) {
  const store = configureStore({
    reducer: {
      offers: offersReducer,
      offer: offerReducer,
      reviews: reviewsReducer,
      auth: authReducer,
    },
    preloadedState: preloadedState as RootState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>
  );
}

export const createTestState = (overrides?: Partial<RootState>): RootState => ({
  offers: {
    city: 'Paris',
    offers: [],
    isLoading: false,
    error: null,
  },
  offer: {
    offer: null,
    nearbyOffers: [],
    reviews: [],
    isLoading: false,
    hasError: false,
  },
  reviews: {
    reviews: [],
    isLoading: false,
    error: null,
  },
  auth: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
  ...overrides,
});
