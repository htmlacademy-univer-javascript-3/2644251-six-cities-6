import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CommentForm from '.';
import authReducer from '../../store/auth/reducer';
import reviewsReducer from '../../store/reviews/reducer';
import { AuthorizationStatus } from '../../const';
import * as reviewsActions from '../../store/reviews/reducer';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const renderWithStore = (isAuthorized: boolean) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      reviews: reviewsReducer,
    },
    preloadedState: {
      auth: {
        authorizationStatus: isAuthorized
          ? AuthorizationStatus.Auth
          : AuthorizationStatus.NoAuth,
        userEmail: null
      },
      reviews: {
        reviews: [],
        isLoading: false,
        error: null,
      },
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<CommentForm />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    ),
  };
};

describe('Component: CommentForm', () => {
  test('does not render when user is not authorized', () => {
    renderWithStore(false);

    expect(screen.queryByText(/Your review/i)).not.toBeInTheDocument();
  });

  test('renders form when user is authorized', () => {
    renderWithStore(true);

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Tell how was your stay/i)
    ).toBeInTheDocument();
  });

  test('submit button is disabled when form is invalid', () => {
    renderWithStore(true);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  test('dispatches postReview on valid submit', () => {
    const postReviewSpy = vi
      .spyOn(reviewsActions, 'postReview')
      .mockReturnValue(vi.fn());

    renderWithStore(true);

    fireEvent.click(screen.getByDisplayValue('5'));

    fireEvent.change(screen.getByPlaceholderText(/Tell how was your stay/i), {
      target: { value: 'A'.repeat(60) },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(postReviewSpy).toHaveBeenCalledWith('1', 'A'.repeat(60), 5);
  });
});
