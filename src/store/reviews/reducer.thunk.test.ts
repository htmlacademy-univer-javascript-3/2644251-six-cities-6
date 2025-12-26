import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { loadReviews, postReview } from './reducer';

describe('reviews async actions', () => {
  it('loadReviews dispatches success', async () => {
    const api = axios.create();
    const mock = new MockAdapter(api);

    mock.onGet('/comments/1').reply(200, [{ id: 1 }]);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await loadReviews(1)(dispatch, getState, api);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'reviews/loadStart',
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'reviews/loadSuccess',
      payload: [{ id: 1 }],
    });
  });

  it('postReview posts and reloads reviews', async () => {
    const api = axios.create();
    const mock = new MockAdapter(api);

    mock
      .onPost('/comments/1')
      .reply(200)
      .onGet('/comments/1')
      .reply(200, [{ id: 2 }]);

    const dispatch = vi.fn();
    const getState = vi.fn();

    await postReview('1', 'Nice', 5)(dispatch, getState, api);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'reviews/loadSuccess',
      payload: [{ id: 2 }],
    });
  });
});
