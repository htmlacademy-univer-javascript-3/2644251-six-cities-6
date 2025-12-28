import { useDispatch, useSelector } from 'react-redux';
import { setCity } from '../../store/offers/reducer';
import { selectActiveCity } from '../../store/offers/selectors';
import { CITIES } from '../../const';

export default function CitiesList() {
  const dispatch = useDispatch();
  const activeCity = useSelector(selectActiveCity);

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li className="locations__item" key={city}>
          <a
            className={`locations__item-link tabs__item
              ${city === activeCity ? 'tabs__item--active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              dispatch(setCity(city));
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
