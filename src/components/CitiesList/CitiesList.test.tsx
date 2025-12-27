import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import offersReducer from '../../store/offers/reducer';
import CitiesList from '.';

function renderWithStore(city: string) {
  const store = configureStore({
    reducer: {
      offers: offersReducer,
    },
    preloadedState: {
      offers: {
        city,
        offers: [],
        isLoading: false,
        error: null,
      },
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <CitiesList />
      </Provider>
    ),
  };
}

describe('Component: CitiesList', () => {
  test('renders all cities', () => {
    renderWithStore('Paris');

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
  });

  test('highlights active city', () => {
    renderWithStore('Amsterdam');

    const activeCityLink = screen.getByText('Amsterdam').closest('a');

    expect(activeCityLink).toHaveClass('tabs__item--active');
  });

  test('dispatches setCity action on city click', () => {
    const { store } = renderWithStore('Paris');

    fireEvent.click(screen.getByText('Cologne'));

    expect(store.getState().offers.city).toBe('Cologne');
  });
});
