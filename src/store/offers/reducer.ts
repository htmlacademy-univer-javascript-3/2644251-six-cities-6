import { ThunkAction } from 'redux-thunk';
import api from '../../api';
import { Offer, OffersState } from './types';
import {
  LOAD_OFFERS_FAILURE,
  LOAD_OFFERS_START,
  LOAD_OFFERS_SUCCESS,
  SET_CITY,
  TOGGLE_FAVORITE_FAILURE,
  TOGGLE_FAVORITE_START,
  TOGGLE_FAVORITE_SUCCESS,
} from '../../const';

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  isLoading: false,
  error: null,
};

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

const toggleFavoriteStart = () => ({
  type: TOGGLE_FAVORITE_START as typeof TOGGLE_FAVORITE_START,
});

const toggleFavoriteSuccess = (offer: Offer) => ({
  type: TOGGLE_FAVORITE_SUCCESS as typeof TOGGLE_FAVORITE_SUCCESS,
  payload: offer,
});

const toggleFavoriteFailure = (err: string) => ({
  type: TOGGLE_FAVORITE_FAILURE as typeof TOGGLE_FAVORITE_FAILURE,
  payload: err,
});

type OffersAction =
  | ReturnType<typeof setCity>
  | ReturnType<typeof loadOffersStart>
  | ReturnType<typeof loadOffersSuccess>
  | ReturnType<typeof loadOffersFailure>
  | ReturnType<typeof toggleFavoriteStart>
  | ReturnType<typeof toggleFavoriteSuccess>
  | ReturnType<typeof toggleFavoriteFailure>;

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

export const toggleFavorite =
  (
    offerId: number,
    isFavorite: boolean
  ): ThunkAction<
    Promise<void>,
    { offers: OffersState },
    typeof api,
    OffersAction
  > =>
    async (dispatch, _getState, apiInstance) => {
      dispatch(toggleFavoriteStart());

      try {
        const status = isFavorite ? 0 : 1;
        const { data } = await apiInstance.post<Offer>(
          `/favorite/${offerId}/${status}`
        );

        dispatch(toggleFavoriteSuccess(data));
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to toggle favorite';
        dispatch(toggleFavoriteFailure(message));
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

    case TOGGLE_FAVORITE_START:
      return { ...state, isLoading: true };

    case TOGGLE_FAVORITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        offers: state.offers.map((offer) =>
          offer.id === action.payload.id ? action.payload : offer
        ),
      };

    case TOGGLE_FAVORITE_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
}
