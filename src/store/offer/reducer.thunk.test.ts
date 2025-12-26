import { describe, it, expect, vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import {
  loadOfferPage,
  LOAD_START,
  LOAD_SUCCESS,
  SET_REVIEWS,
  LOAD_ERROR,
} from './reducer';

describe('offer async actions', () => {
  it('dispatches LOAD_START → LOAD_SUCCESS → SET_REVIEWS on success', async () => {
    const api = axios.create();
    const mock = new MockAdapter(api);

    mock
      .onGet('/offers/1')
      .reply(200, { id: 1 })
      .onGet('/offers/1/nearby')
      .reply(200, [{ id: 2 }])
      .onGet('/comments/1')
      .reply(200, [{ id: 3 }]);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await loadOfferPage('1')(dispatch, getState, api);

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: LOAD_START });

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: LOAD_SUCCESS,
      payload: {
        offer: { id: 1 },
        nearby: [{ id: 2 }],
      },
    });

    expect(dispatch).toHaveBeenNthCalledWith(3, {
      type: SET_REVIEWS,
      payload: [{ id: 3 }],
    });
  });

  it('dispatches LOAD_ERROR on failure', async () => {
    const api = axios.create();
    const mock = new MockAdapter(api);

    mock.onGet('/offers/1').reply(500);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await loadOfferPage('1')(dispatch, getState, api);

    expect(dispatch).toHaveBeenCalledWith({ type: LOAD_ERROR });
  });
});
