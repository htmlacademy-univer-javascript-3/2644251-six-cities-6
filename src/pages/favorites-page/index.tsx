import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { AuthorizationStatus } from '../../const';
import { useNavigate, Link } from 'react-router-dom';
import OfferCard from '../../components/offer-card';
import { loadOffers } from '../../store/offers/reducer';
import { Offer } from '../../store/offers/types';
import { selectUserEmail } from '../../store/auth/selectors';

type FavoritesPageProps = {
  offers: Offer[];
};

function Favorites({ offers }: FavoritesPageProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const authStatus = useSelector(
    (state: RootState) => state.auth.authorizationStatus
  );

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(loadOffers());
    }
  }, [authStatus, dispatch]);

  useEffect(() => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
    }
  }, [authStatus, navigate]);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(loadOffers());
    }
  }, [authStatus, dispatch]);

  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  const offersByCity = favoriteOffers.reduce(
    (acc: Record<string, Offer[]>, offer) => {
      if (!acc[offer.city.name]) {
        acc[offer.city.name] = [];
      }
      acc[offer.city.name].push(offer);
      return acc;
    },
    {}
  );

  const favoriteCount = favoriteOffers.length;
  const userEmail = useSelector(selectUserEmail);

  if (favoriteOffers.length === 0) {
    return (
      <div className="page page--favorites-empty">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link to="/" className="header__logo-link">
                  <img
                    className="header__logo"
                    src="img/logo.svg"
                    alt="6 cities logo"
                    width={81}
                    height={41}
                  />
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link
                      to="/favorites"
                      className="header__nav-link header__nav-link--profile"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                        {userEmail}
                      </span>
                      <span className="header__favorite-count">
                        {favoriteCount}
                      </span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link to="/login" className="header__nav-link">
                      <span className="header__signout">Sign in</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites</h1>
              <p>Nothing yet saved</p>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    to="/favorites"
                    className="header__nav-link header__nav-link--profile"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      {userEmail}
                    </span>
                    <span className="header__favorite-count">
                      {favoriteCount}
                    </span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link to="/login" className="header__nav-link">
                    <span className="header__signout">Sign in</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {Object.entries(offersByCity).map(([city, cityOffers]) => (
            <section key={city} className="favorites">
              <h2 className="favorites__city">{city}</h2>
              <ul className="favorites__list">
                {cityOffers.map((offer) => (
                  <li key={offer.id} className="favorites__locations-items">
                    <OfferCard {...offer} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Favorites;
