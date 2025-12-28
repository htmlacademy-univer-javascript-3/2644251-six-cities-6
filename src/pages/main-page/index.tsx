import MemoizedOfferList from '../../components/offer-list';
import MemoizedMap from '../../components/map';
import CitiesList from '../../components/cities-list';
import SortOptions from '../../components/sort-options';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useMemo, useState } from 'react';
import Spinner from '../../components/spinner';
import { AuthorizationStatus } from '../../const';
import {
  selectActiveCity,
  selectAllOffers,
} from '../../store/offers/selectors';
import { selectAuthStatus, selectUserEmail } from '../../store/auth/selectors';
import { selectOfferLoading } from '../../store/offer/selectors';
import { setAuthorizationStatus, setUserEmail } from '../../store/auth/reducer';

function MainPage(): JSX.Element {
  const city = useSelector(selectActiveCity);
  const isLoading = useSelector(selectOfferLoading);
  const allOffers = useSelector(selectAllOffers);
  const offers = allOffers.filter((o) => o.city.name === city);
  const favoriteCount = allOffers.filter((offer) => offer.isFavorite).length;
  const [hoveredOfferId, setHoveredOfferId] = useState<number | null>(null);
  const [sortType, setSortType] = useState('Popular');
  const handleHover = useCallback((id: number | null) => {
    setHoveredOfferId(id);
  }, []);

  const dispatch = useDispatch();
  const handleSignOut = () => {
    localStorage.removeItem('six-cities-token');
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUserEmail(null));
  };

  const authStatus = useSelector(selectAuthStatus);

  const sortedOffers = useMemo(() => {
    switch (sortType) {
      case 'PriceLowHigh':
        return [...offers].sort((a, b) => a.price - b.price);
      case 'PriceHighLow':
        return [...offers].sort((a, b) => b.price - a.price);
      case 'TopRated':
        return [...offers].sort((a, b) => b.rating - a.rating);
      default:
        return offers;
    }
  }, [sortType, offers]);

  const userEmail = useSelector(selectUserEmail);

  const offerCount = offers.length;
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authStatus === AuthorizationStatus.Auth ? (
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
                    <span
                      className="header__signout"
                      onClick={handleSignOut}
                      style={{ cursor: 'pointer' }}
                    >
                      Sign out
                    </span>
                  </li>
                ) : (
                  <li className="header__nav-item">
                    <Link to="/login" className="header__nav-link">
                      <span className="header__signout">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <b className="places__found">
                    {offerCount} places to stay in {city}
                  </b>
                  <SortOptions value={sortType} onChange={setSortType} />
                  <MemoizedOfferList
                    offers={sortedOffers}
                    onHoverOffer={handleHover}
                  />
                </>
              )}
            </section>
            <div className="cities__right-section">
              <MemoizedMap
                offers={sortedOffers}
                hoveredOfferId={hoveredOfferId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
