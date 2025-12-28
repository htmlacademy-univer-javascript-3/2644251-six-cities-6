import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { toggleFavorite } from './reducer';

describe('offers async actions', () => {
  it('dispatches TOGGLE_FAVORITE_START → TOGGLE_FAVORITE_SUCCESS', async () => {
    const api = axios.create();
    const mock = new MockAdapter(api);

    const offerId = 1;
    const isFavorite = false;

    const updatedOffer = { id: offerId, isFavorite: true };
    mock.onPost(`/favorite/${offerId}/1`).reply(200, updatedOffer);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await toggleFavorite(offerId, isFavorite)(dispatch, getState, api);

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: 'offers/TOGGLE_FAVORITE_START',
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: 'offers/TOGGLE_FAVORITE_SUCCESS',
      payload: updatedOffer,
    });
  });

  it('dispatches TOGGLE_FAVORITE_FAILURE on error', async () => {
    const api = axios.create();
    const mock = new MockAdapter(api);

    const offerId = 1;
    const isFavorite = false;

    mock.onPost(`/favorite/${offerId}/1`).reply(500);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await toggleFavorite(offerId, isFavorite)(dispatch, getState, api);

    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'offers/TOGGLE_FAVORITE_FAILURE',
      payload: 'Request failed with status code 500',
    });
  });
});
