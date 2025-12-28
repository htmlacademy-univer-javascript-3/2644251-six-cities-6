import authReducer, { setAuthorizationStatus, setUserEmail } from './reducer';
import { AuthorizationStatus } from '../../const';
import type { AuthState } from './reducer';

describe('auth reducer', () => {
  const initialState: AuthState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userEmail: null,
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

  it('should set userEmail', () => {
    const email = 'test@example.com';
    const state = authReducer(initialState, setUserEmail(email));
    expect(state.userEmail).toBe(email);
  });

  it('should reset userEmail to null', () => {
    const state = authReducer(
      { ...initialState, userEmail: 'foo@bar.com' },
      setUserEmail(null)
    );
    expect(state.userEmail).toBeNull();
  });
});
