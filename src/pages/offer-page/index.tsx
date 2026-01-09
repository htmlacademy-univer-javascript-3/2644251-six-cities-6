import { useEffect, useMemo, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import MemoizedReviewList from '../../components/review-list';
import CommentForm from '../../components/comment-form';
import MemoizedMap from '../../components/map-component';
import MemoizedOfferList from '../../components/offer-list';
import { loadOfferPage } from '../../store/offer/reducer';
import Spinner from '../../components/spinner-component';
import {
  selectNearbyOffers,
  selectOffer,
  selectOfferError,
  selectOfferLoading,
  selectReviews,
} from '../../store/offer/selectors';
import { selectAuthStatus, selectUserEmail } from '../../store/auth/selectors';
import { selectAllOffers } from '../../store/offers/selectors';
import { toggleFavorite } from '../../store/offers/reducer';
import classNames from 'classnames';
import { setAuthorizationStatus, setUserEmail } from '../../store/auth/reducer';
import { AuthorizationStatus } from '../../const';

function Offer(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const offer = useSelector(selectOffer);
  const nearbyOffers = useSelector(selectNearbyOffers);
  const reviews = useSelector(selectReviews);
  const isLoading = useSelector(selectOfferLoading);
  const hasError = useSelector(selectOfferError);

  const allOffers = useSelector(selectAllOffers);
  const favoriteCount = allOffers.filter((o) => o.isFavorite).length;

  const [hoveredOfferId, setHoveredOfferId] = useState<number | null>(null);

  const images = useMemo(() => offer?.images ?? [], [offer]);
  const goods = useMemo(() => offer?.goods ?? [], [offer]);

  const userEmail = useSelector(selectUserEmail);

  const [isFavorite, setIsFavorite] = useState(offer?.isFavorite ?? false);

  useEffect(() => {
    setIsFavorite(offer?.isFavorite ?? false);
  }, [offer?.isFavorite]);

  const sortedReviews = useMemo(
    () =>
      [...reviews]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10),
    [reviews]
  );

  const authStatus = useSelector(selectAuthStatus);

  const handleBookmarkClick = () => {
    if (!offer) {
      return;
    }
    setIsFavorite((prev) => !prev);
    dispatch(toggleFavorite(offer.id, offer.isFavorite ?? false));
  };

  useEffect(() => {
    if (id) {
      dispatch(loadOfferPage(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (hasError || !offer) {
    return <Navigate to="/404" replace />;
  }

  const handleSignOut = () => {
    localStorage.removeItem('six-cities-token');
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(setUserEmail(null));
  };

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
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

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((img) => (
                <div className="offer__image-wrapper" key={img}>
                  <img className="offer__image" src={img} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  className={classNames('offer__bookmark-button button', {
                    'offer__bookmark-button--active': isFavorite,
                  })}
                  type="button"
                  onClick={handleBookmarkClick}
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">
                    {isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: `${(offer.rating / 5) * 100}%` }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>

                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>

              <section className="offer__reviews reviews">
                <MemoizedReviewList reviews={sortedReviews} />
                <CommentForm />
              </section>
            </div>
          </div>

          <MemoizedMap
            offers={nearbyOffers}
            hoveredOfferId={hoveredOfferId}
            className="offer__map map"
          />
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <MemoizedOfferList
              offers={nearbyOffers}
              onHoverOffer={setHoveredOfferId}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
