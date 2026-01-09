import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from './store';
import AppRoutes from './AppRoutes';
import { useEffect } from 'react';
import { checkAuth } from './store/auth/reducer';

function AppInitializer(): JSX.Element | null {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return null;
}

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppInitializer />
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
