import OfferList from '../../components/OfferList';
import Map from '../../components/Map';
import CitiesList from '../../components/CitiesList';
import SortOptions from '../../components/SortOptions';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useMemo, useState } from 'react';
import Spinner from '../../components/Spinner';
import { AuthorizationStatus } from '../../const';

function MainPage(): JSX.Element {
  const city = useSelector((state: RootState) => state.offers.city);
  const { isLoading } = useSelector((state: RootState) => state.offers);

  const allOffers = useSelector((state: RootState) => state.offers.offers);
  const offers = allOffers.filter((o) => o.city.name === city);
  const [hoveredOfferId, setHoveredOfferId] = useState<number | null>(null);
  const [sortType, setSortType] = useState('Popular');

  const authStatus = useSelector(
    (state: RootState) => state.auth.authorizationStatus
  );

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
                        Oliver.conner@gmail.com
                      </span>
                      <span className="header__favorite-count">3</span>
                    </Link>
                    <button className="header__logout">Sign out</button>
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
                  <OfferList
                    offers={sortedOffers}
                    onHoverOffer={setHoveredOfferId}
                  />{' '}
                </>
              )}
            </section>
            <div className="cities__right-section">
              <Map offers={sortedOffers} hoveredOfferId={hoveredOfferId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
