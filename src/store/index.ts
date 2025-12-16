import { configureStore } from '@reduxjs/toolkit';
import offersReducer from './offers/reducer';
import reviewsReducer from './reviews/reducer';
import api from '../api';

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    reviews: reviewsReducer,
  },
  middleware: (getDefault) =>
    getDefault({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
