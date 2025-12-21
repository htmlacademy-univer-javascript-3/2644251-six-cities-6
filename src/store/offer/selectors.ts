import { RootState } from '../index';
import { createSelector } from '@reduxjs/toolkit';

export const selectOfferState = (state: RootState) => state.offer;

export const selectOffer = createSelector(
  selectOfferState,
  (offerState) => offerState.offer
);

export const selectNearbyOffers = createSelector(
  selectOfferState,
  (offerState) => offerState.nearbyOffers
);

export const selectReviews = createSelector(
  selectOfferState,
  (offerState) => offerState.reviews
);

export const selectOfferLoading = createSelector(
  selectOfferState,
  (offerState) => offerState.isLoading
);

export const selectOfferError = createSelector(
  selectOfferState,
  (offerState) => offerState.hasError
);
