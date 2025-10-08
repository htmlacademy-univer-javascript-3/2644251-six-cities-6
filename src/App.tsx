import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import FavoritesPage from './pages/FavoritesPage';
import LoginPage from './pages/LoginPage';
import OfferPage from './pages/OfferPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';

type AppProps = {
  offerCount: number;
};

function App({ offerCount }: AppProps): JSX.Element {
  const IS_AUTHORIZED = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage offerCount={offerCount} />}></Route>
          <Route
            path="favorites"
            element={
              <PrivateRoute isAuthorized={IS_AUTHORIZED}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="offer/:id" element={<OfferPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
