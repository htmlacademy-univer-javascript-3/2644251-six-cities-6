import { describe, it, expect, vi } from 'vitest';
import { checkAuth } from './reducer';
import { AuthorizationStatus } from '../../const';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('auth async actions', () => {
  const mockAxios = new MockAdapter(axios);
  const dispatch = vi.fn();
  const getState = vi.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mockAxios.reset();
  });
  it('dispatches Auth when api.get succeeds', async () => {
    mockAxios.onGet('/login').reply(200);

    await checkAuth()(dispatch, getState, axios);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'auth/setAuthorizationStatus',
      payload: AuthorizationStatus.Auth,
    });
  });

  it('dispatches NoAuth when api.get fails', async () => {
    mockAxios.onGet('/login').reply(401);

    await checkAuth()(dispatch, getState, axios);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'auth/setAuthorizationStatus',
      payload: AuthorizationStatus.NoAuth,
    });
  });
});
