import { describe, it, expect, vi } from 'vitest';
import { login } from './reducer';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthorizationStatus } from '../../const';

describe('auth async actions', () => {
  const mockAxios = new MockAdapter(axios);
  const dispatch = vi.fn();
  const getState = vi.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mockAxios.reset();
  });

  it('dispatches Auth when api.get succeeds for checkAuth', async () => {
    mockAxios.onGet('/login').reply(200);

    const { checkAuth } = await import('./reducer');
    await checkAuth()(dispatch, getState, axios);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'auth/setAuthorizationStatus',
      payload: AuthorizationStatus.Auth,
    });
  });

  it('dispatches NoAuth when api.get fails for checkAuth', async () => {
    mockAxios.onGet('/login').reply(401);

    const { checkAuth } = await import('./reducer');
    await checkAuth()(dispatch, getState, axios);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'auth/setAuthorizationStatus',
      payload: AuthorizationStatus.NoAuth,
    });
  });

  it('dispatches Auth and sets userEmail when login succeeds', async () => {
    const email = 'user@example.com';
    const password = '123';
    mockAxios.onPost('/login').reply(200, { token: 'abc' });

    await login(email, password)(dispatch, getState, axios);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'auth/setAuthorizationStatus',
      payload: AuthorizationStatus.Auth,
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'auth/setUserEmail',
      payload: email,
    });

    expect(localStorage.getItem('six-cities-token')).toBe('abc');
  });
});
