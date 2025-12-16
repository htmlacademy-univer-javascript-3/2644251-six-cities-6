import { ThunkAction } from 'redux-thunk';
import api from '../../api';
import { Offer } from './types';

export type OffersState = {
  city: string;
  offers: Offer[];
  isLoading: boolean;
  error: string | null;
};

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  isLoading: false,
  error: null,
};

const SET_CITY = 'offers/SET_CITY' as const;
const LOAD_OFFERS_START = 'offers/LOAD_OFFERS_START' as const;
const LOAD_OFFERS_SUCCESS = 'offers/LOAD_OFFERS_SUCCESS' as const;
const LOAD_OFFERS_FAILURE = 'offers/LOAD_OFFERS_FAILURE' as const;

export const setCity = (city: string) => ({
  type: SET_CITY,
  payload: city,
});

const loadOffersStart = () => ({
  type: LOAD_OFFERS_START,
});

const loadOffersSuccess = (offers: Offer[]) => ({
  type: LOAD_OFFERS_SUCCESS,
  payload: offers,
});

const loadOffersFailure = (err: string) => ({
  type: LOAD_OFFERS_FAILURE,
  payload: err,
});

type OffersAction =
  | ReturnType<typeof setCity>
  | ReturnType<typeof loadOffersStart>
  | ReturnType<typeof loadOffersSuccess>
  | ReturnType<typeof loadOffersFailure>;

export const loadOffers =
  (): ThunkAction<
    Promise<void>,
    { offers: OffersState },
    typeof api,
    OffersAction
  > =>
    async (dispatch, _getState, apiInstance) => {
      dispatch(loadOffersStart());
      try {
        const response = await apiInstance.get<Offer[]>('/offers');
        dispatch(loadOffersSuccess(response.data));
      } catch (err) {
        const message =
        err instanceof Error ? err.message : 'Failed to load offers';
        dispatch(loadOffersFailure(message));
      }
    };

export default function offersReducer(
  state: OffersState = initialState,
  action: OffersAction
): OffersState {
  switch (action.type) {
    case SET_CITY:
      return { ...state, city: action.payload };

    case LOAD_OFFERS_START:
      return { ...state, isLoading: true, error: null };

    case LOAD_OFFERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        offers: action.payload,
        error: null,
      };

    case LOAD_OFFERS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}
