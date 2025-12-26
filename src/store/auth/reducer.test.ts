import authReducer, { setAuthorizationStatus } from './reducer';
import { AuthorizationStatus } from '../../const';
import type { AuthState } from './reducer';
import { vi } from 'vitest';

vi.mock('../store/auth/reducer', () => ({
  checkAuth: () => ({ type: 'auth/checkAuth' }),
}));

describe('auth reducer', () => {
  const initialState: AuthState = {
    authorizationStatus: AuthorizationStatus.Unknown,
  };

  it('should return initial state with unknown action', () => {
    expect(authReducer(undefined, { type: 'UNKNOWN' })).toEqual(initialState);
  });

  it('should set authorization status to Auth', () => {
    const state = authReducer(
      initialState,
      setAuthorizationStatus(AuthorizationStatus.Auth)
    );

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
  });

  it('should set authorization status to NoAuth', () => {
    const state = authReducer(
      initialState,
      setAuthorizationStatus(AuthorizationStatus.NoAuth)
    );

    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });
});
