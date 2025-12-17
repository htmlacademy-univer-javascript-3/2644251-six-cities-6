import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { RootState } from '../index';

export type AuthState = {
  authorizationStatus: AuthorizationStatus;
};

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorizationStatus(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
  },
});

export const { setAuthorizationStatus } = authSlice.actions;
export default authSlice.reducer;

type AuthActions = ReturnType<typeof setAuthorizationStatus>;

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  AxiosInstance,
  AuthActions
>;

export const checkAuth =
  (): AppThunk<Promise<void>> => async (dispatch, _getState, api) => {
    try {
      await api.get('/login');
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  };

type AuthResponse = {
  token: string;
};

export const login =
  (email: string, password: string): AppThunk<Promise<void>> =>
    async (dispatch, _getState, api) => {
      const response = await api.post<AuthResponse>('/login', {
        email,
        password,
      });

      localStorage.setItem('six-cities-token', response.data.token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    };
