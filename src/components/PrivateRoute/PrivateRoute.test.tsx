import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import PrivateRoute from '.';

describe('Component: PrivateRoute', () => {
  it('should redirect to /login when user is not authorized', () => {
    render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <div>Private page</div>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div>Login page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Private page')).not.toBeInTheDocument();
  });

  it('should render children when user is authorized', () => {
    render(
      <MemoryRouter>
        <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
          <div>Private page</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Private page')).toBeInTheDocument();
  });
});
