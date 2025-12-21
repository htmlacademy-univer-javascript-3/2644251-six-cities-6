import { configureStore } from '@reduxjs/toolkit';
import api from '../api';
import offersReducer from './offers/reducer';
import reviewsReducer from './reviews/reducer';
import authReducer from './auth/reducer';
import offerPageReducer from './offer/reducer';

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    reviews: reviewsReducer,
    auth: authReducer,
    offer: offerPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
