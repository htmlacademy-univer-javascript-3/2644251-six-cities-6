import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';

import MainPage from './pages/MainPage';
import FavoritesPage from './pages/FavoritesPage';
import LoginPage from './pages/LoginPage';
import OfferPage from './pages/OfferPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';

export default function AppRoutes(): JSX.Element {
  const offers = useSelector((state: RootState) => state.offers.offers);
  const authStatus = useSelector(
    (state: RootState) => state.auth.authorizationStatus
  );

  return (
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
  );
}
