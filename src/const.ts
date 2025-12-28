export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const RATING_TITLES = [
  'terribly',
  'badly',
  'not bad',
  'good',
  'perfect',
];

export const SORTING = [
  { value: 'Popular', label: 'Popular' },
  { value: 'PriceLowHigh', label: 'Price: low to high' },
  { value: 'PriceHighLow', label: 'Price: high to low' },
  { value: 'TopRated', label: 'Top rated first' },
];

export const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';

export const LOAD_START = 'offer/loadStart';
export const LOAD_SUCCESS = 'offer/loadSuccess';
export const LOAD_ERROR = 'offer/loadError';
export const SET_REVIEWS = 'offer/setReviews';

export const SET_CITY = 'offers/SET_CITY' as const;
export const LOAD_OFFERS_START = 'offers/LOAD_OFFERS_START' as const;
export const LOAD_OFFERS_SUCCESS = 'offers/LOAD_OFFERS_SUCCESS' as const;
export const LOAD_OFFERS_FAILURE = 'offers/LOAD_OFFERS_FAILURE' as const;

export const LOAD_REVIEWS_START = 'reviews/loadStart';
export const LOAD_REVIEWS_SUCCESS = 'reviews/loadSuccess';
export const LOAD_REVIEWS_FAILURE = 'reviews/loadFailure';

export const TOGGLE_FAVORITE_START = 'offers/TOGGLE_FAVORITE_START';
export const TOGGLE_FAVORITE_SUCCESS = 'offers/TOGGLE_FAVORITE_SUCCESS';
export const TOGGLE_FAVORITE_FAILURE = 'offers/TOGGLE_FAVORITE_FAILURE';
