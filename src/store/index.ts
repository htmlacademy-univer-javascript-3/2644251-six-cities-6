import { configureStore } from '@reduxjs/toolkit';
import offersReducer from './offers/reducer';
import reviewsReducer from './reviews/reducer';
import api from '../api';
import authReducer from './auth/reducer';

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    reviews: reviewsReducer,
    auth: authReducer,
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
