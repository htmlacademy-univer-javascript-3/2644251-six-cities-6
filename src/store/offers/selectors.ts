import { RootState } from '../index';
import { createSelector } from '@reduxjs/toolkit';

export const selectOffersState = (state: RootState) => state.offers;

export const selectAllOffers = createSelector(
  selectOffersState,
  (state) => state.offers
);

export const selectActiveCity = createSelector(
  selectOffersState,
  (state) => state.city
);

export const selectOffersLoading = createSelector(
  selectOffersState,
  (state) => state.isLoading
);
