import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AppRoutes from './AppRoutes';
import { AuthorizationStatus } from './const';
import { createTestState, renderWithProviders } from './test-utils';

describe('Application routing', () => {
  it('renders MainPage on "/"', () => {
    renderWithProviders(<AppRoutes />, {
      route: '/',
      preloadedState: createTestState({
        auth: {
          authorizationStatus: AuthorizationStatus.Auth,
          userEmail: null
        },
      }),
    });

    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
  });

  it('renders LoginPage on "/login"', () => {
    renderWithProviders(<AppRoutes />, {
      route: '/login',
      preloadedState: createTestState(),
    });

    expect(
      screen.getByRole('heading', { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it('redirects unauthorized user from "/favorites"', () => {
    renderWithProviders(<AppRoutes />, {
      route: '/favorites',
      preloadedState: createTestState({
        auth: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: null
        },
      }),
    });

    expect(
      screen.getByRole('heading', { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it('renders NotFoundPage for unknown route', () => {
    renderWithProviders(<AppRoutes />, {
      route: '/unknown',
      preloadedState: createTestState(),
    });

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
