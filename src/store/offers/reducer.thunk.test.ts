import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { loadOffers } from './reducer';

describe('offers async actions', () => {
  it('dispatches LOAD_OFFERS_START → LOAD_OFFERS_SUCCESS', async () => {
    const api = axios.create();
    const mock = new MockAdapter(api);

    mock.onGet('/offers').reply(200, [{ id: 1 }]);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await loadOffers()(dispatch, getState, api);

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: 'offers/LOAD_OFFERS_START',
    });

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: 'offers/LOAD_OFFERS_SUCCESS',
      payload: [{ id: 1 }],
    });
  });

  it('dispatches LOAD_OFFERS_FAILURE on error', async () => {
    const api = axios.create();
    const mock = new MockAdapter(api);

    mock.onGet('/offers').reply(500);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await loadOffers()(dispatch, getState, api);

    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'offers/LOAD_OFFERS_FAILURE',
      payload: 'Request failed with status code 500',
    });
  });
});
