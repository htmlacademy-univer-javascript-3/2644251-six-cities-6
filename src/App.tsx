import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from './store';
import MainPage from './pages/MainPage';
import FavoritesPage from './pages/FavoritesPage';
import LoginPage from './pages/LoginPage';
import OfferPage from './pages/OfferPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';
import { loadOffers } from './store/offers/reducer.ts';
import { checkAuth } from './store/auth/reducer.ts';

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const offers = useSelector((state: RootState) => state.offers.offers);
  const authStatus = useSelector(
    (state: RootState) => state.auth.authorizationStatus
  );
  useEffect(() => {
    dispatch(loadOffers());
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<MainPage />} />
            <Route
              path="favorites"
              element={
                <PrivateRoute authorizationStatus={authStatus}>
                  <FavoritesPage offers={offers} />
                </PrivateRoute>
              }
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="offer/:id" element={<OfferPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
