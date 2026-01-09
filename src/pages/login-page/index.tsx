import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { login } from '../../store/auth/reducer';
import { AuthorizationStatus, CITIES } from '../../const';
import { setCity } from '../../store/offers/reducer';
import { selectAuthStatus } from '../../store/auth/selectors';

function Login(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getRandomCity = () => CITIES[Math.floor(Math.random() * CITIES.length)];

  const [randomCity] = useState(() => getRandomCity());

  const handleRandomCityClick = () => {
    dispatch(setCity(randomCity));
    navigate('/');
  };

  const authStatus = useSelector(selectAuthStatus);
  if (authStatus === AuthorizationStatus.Auth) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  pattern="^(?=.*[A-Za-z])(?=.*\d).+$"
                  title="Password must contain at least one letter and one number"
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <button
                type="button"
                className="locations__item-link"
                onClick={handleRandomCityClick}
                style={{ border: 'none' }}
              >
                <span>{randomCity}</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
