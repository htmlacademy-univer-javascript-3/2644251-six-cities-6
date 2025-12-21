import { RootState } from '../index';
import { createSelector } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';

export const selectAuthState = (state: RootState) => state.auth;

export const selectAuthStatus = createSelector(
  selectAuthState,
  (state) => state.authorizationStatus
);

export const selectIsAuthorized = createSelector(
  selectAuthStatus,
  (status) => status === AuthorizationStatus.Auth
);
