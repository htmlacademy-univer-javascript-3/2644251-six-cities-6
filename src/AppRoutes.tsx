import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';

import MainPage from './pages/main-page';
import FavoritesPage from './pages/favorites-page';
import LoginPage from './pages/login-page';
import OfferPage from './pages/offer-page';
import NotFoundPage from './pages/not-found-page';
import PrivateRoute from './components/private-route';

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
